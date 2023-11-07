use actix_web::{get, http, web, web::Json, App, HttpResponse, HttpServer, Responder, Result};
// use actix_web_learn::not_found;
// use actix_web_learn::operation;
use handlebars::Handlebars;
use serde::Serialize;

#[derive(Serialize)]
struct Message {
    message: String,
}

#[get("/")]
async fn home() -> Json<Message> {
    Json(Message {
        message: String::from("Hello World"),
    })
}

#[get("/greet/{name}")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {}!", name)
}

async fn manual_hello() -> impl Responder {
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
    HttpResponse::Ok()
        .status(http::StatusCode::OK)
        .body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let mut handlebars = Handlebars::new();

    handlebars
        .register_templates_directory(".html", "./templates/")
        .unwrap();

    let data = web::Data::new(handlebars);

    HttpServer::new(move || {
        App::new()
            .app_data(data.clone())
            .service(home)
            .service(greet)
            .route("/hey", web::get().to(manual_hello))
        // .default_service(web::route().to(not_found::not_found))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
