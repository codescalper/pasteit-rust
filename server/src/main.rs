use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use serde_json::json;
use sqlx::postgres::PgPoolOptions;
use std::collections::HashMap;
use std::sync::Mutex;
struct AppState {
    db: Mutex<sqlx::PgPool>,
}

async fn submit(content: web::Json<FormData>, data: web::Data<AppState>) -> impl Responder {
    let token: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(10)
        .map(char::from)
        .collect();

    let mut paste = HashMap::new();
    paste.insert("content", content.content.clone());
    paste.insert("selected_language", content.selected_language.clone());

    let paste_json = serde_json::to_string(&paste).unwrap();

    let conn = data.db.lock().unwrap();
    sqlx::query!(
        "INSERT INTO pastes (token, content) VALUES ($1, $2)",
        &token,
        &paste_json
    )
    .execute(&*conn)
    .await
    .expect("Failed to insert into database");

    // Return the token in JSON format
    HttpResponse::Ok()
        .content_type("application/json")
        .body(json!({ "token": token }).to_string())
}

async fn get_paste(token: web::Path<String>, data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let paste = sqlx::query!(
        "SELECT content FROM pastes WHERE token = $1",
        token.to_string()
    )
    .fetch_one(&*conn)
    .await
    .map(|row| row.content)
    .unwrap_or("Paste not found".to_string());

    let paste_data: HashMap<String, String> =
        serde_json::from_str(&paste).unwrap_or(HashMap::new());

    HttpResponse::Ok()
        .content_type("application/json")
        .body(json!(paste_data).to_string())
}

#[derive(serde::Deserialize)]
struct FormData {
    content: String,
    selected_language: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");
    let db = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database");

    let app_state = web::Data::new(AppState { db: Mutex::new(db) });

    let server = HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allow_any_header()
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .route("/submit", web::post().to(submit))
            .route("/paste/{token}", web::get().to(get_paste))
    })
    .bind("http://0.0.0.0:8080")?;

    println!("Server is listening on http://0.0.0.0:8080");

    server.run().await
}
