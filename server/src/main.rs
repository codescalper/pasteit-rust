use actix_cors::Cors;
use actix_files::Files;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use rusqlite::{params, Connection};
use serde_json::json;
use std::sync::Mutex;

struct AppState {
    db: Mutex<Connection>,
}

#[derive(serde::Deserialize)]
struct FormData {
    code: String,
    selectedLanguageName: String,
}

async fn submit(content: web::Json<FormData>, data: web::Data<AppState>) -> impl Responder {
    let token: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(10)
        .map(char::from)
        .collect();

    let conn = data.db.lock().unwrap();
    conn.execute(
        "INSERT INTO pastes (token, code, selectedLanguageName) VALUES (?, ?, ?)",
        params![&token, &content.code, &content.selectedLanguageName],
    )
    .expect("Failed to insert into database");

    HttpResponse::Ok().json(json!({"token": format!("/paste/{}", token)}))
}

async fn get_paste(token: web::Path<String>, data: web::Data<AppState>) -> impl Responder {
    let conn = data.db.lock().unwrap();
    let (code, selectedLanguageName) = conn
        .query_row(
            "SELECT code, selectedLanguageName FROM pastes WHERE token = ?",
            params![token.to_string()],
            |row| Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?)),
        )
        .unwrap_or_else(|_| ("Paste not found".to_string(), "Paste not found".to_string()));

    HttpResponse::Ok().body(format!(
        "<pre>Code: {}\nSelected Language: {}</pre>",
        code, selectedLanguageName
    ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = Connection::open("pastes.db").expect("Failed to open database");
    db.execute(
        "CREATE TABLE IF NOT EXISTS pastes (token TEXT PRIMARY KEY, code TEXT, selectedLanguageName TEXT)",
        params![],
    )
    .expect("Failed to create table");

    let app_state = web::Data::new(AppState { db: Mutex::new(db) });

    HttpServer::new(move || {
        let cors = Cors::default();
        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .service(Files::new("/", "./client/dist").index_file("index.html"))
            .route("/submit", web::post().to(submit))
            .route("/paste/{token}", web::get().to(get_paste))
    })
    .bind(("127.0.0.1", 80))?
    .run()
    .await
}
