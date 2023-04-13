use std::env;

fn main() {
    let project_dir = env::current_dir().unwrap();
    let nmap_path = project_dir.join("nmap.exe");
    println!(
        "Copying nmap binary from {} to build directory",
        nmap_path.display()
    );
    std::fs::copy(nmap_path, "build/nmap").unwrap();
    tauri_build::build();
}
