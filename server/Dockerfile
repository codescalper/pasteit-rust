FROM rust:latest as build

# Setup working directory
WORKDIR /usr/src/paste-it
COPY . .

ENV DATABASE_URL="postgresql://postgres:wUtOrb8QveeoHm8R@db.sattatglqvcwzniomdoe.supabase.co:5432/postgres"

# Build application
RUN cargo install --path .

FROM rust:latest

# Application files
COPY --from=build /usr/local/cargo/bin/paste-it /usr/local/bin/paste-it

CMD ["paste-it"]
