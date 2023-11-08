use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use rusqlite::{params, Connection};
use serde_json::json;
use std::collections::HashMap;
use std::sync::Mutex;
struct AppState {
    db: Mutex<Connection>,
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
    conn.execute(
        "INSERT INTO pastes (token, content) VALUES (?, ?)",
        params![&token, &paste_json],
    )
    .expect("Failed to insert into database");

    // Return the token in JSON format
    HttpResponse::Ok()
        .content_type("application/json")
        .body(json!({ "token": token }).to_string())
}

async fn get_paste(token: web::Path<String>, data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let paste = conn
        .query_row(
            "SELECT content FROM pastes WHERE token = ?",
            params![token.to_string()],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_else(|_| "Paste not found".to_string());

    let paste_data: HashMap<String, String> = serde_json::from_str(&paste).unwrap();
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
    let db = Connection::open("pastes.db").expect("Failed to open database");
    db.execute(
        "CREATE TABLE IF NOT EXISTS pastes (token TEXT PRIMARY KEY, content TEXT)",
        params![],
    )
    .expect("Failed to create table");

    let app_state = web::Data::new(AppState { db: Mutex::new(db) });

    HttpServer::new(move || {
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
    .bind("127.0.0.1:8081")?
    .run()
    .await
}
