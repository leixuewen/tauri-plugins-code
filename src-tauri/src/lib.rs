// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn webview_window(webview_window: tauri::WebviewWindow) -> String {
    format!("{:?}", webview_window)
}

#[tauri::command]
async fn app_handle(app_handle: tauri::AppHandle) -> String {
    // app_handle.global_shortcut().register("CTRL + U", move || {});
    // app_handle.listen("download-started", |event| {});
    // app_handle.once("ready", |event| {});
    // app_handle.emit("ready", |event| {});
    format!("{:?}", app_handle)
}

#[tauri::command]
fn ipc_request(request: tauri::ipc::Request) -> String {
    format!("{:?}", request)
}

#[tauri::command]
fn ipc_channel(channel: tauri::ipc::Channel<&str>) {
    for i in 0..9 {
        let _ = channel.send((format!("Hello, {}!", i)).as_str());
        std::thread::sleep(std::time::Duration::from_secs(1));
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_cache::init())
        .plugin(tauri_plugin_serialplugin::init())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:mydatabase.db", migration_sql())
                .build(),
        )
        .plugin(tauri_plugin_notification::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                // .max_file_size(50_000)
                // .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
                // Have to add [dependencies] log = "0.4.27"
                // .level(log::LevelFilter::Info)
                // .level_for("my_crate_name::commands", log::LevelFilter::Trace)
                // exclude logs with target `"hyper"`
                // .filter(|metadata| metadata.target() != "hyper")
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Webview,
                ))
                .build(),
        )
        .setup(|app| {
            let handle = app.handle();
            #[cfg(desktop)]
            {
                let _ = handle.plugin(tauri_plugin_autostart::init(
                    tauri_plugin_autostart::MacosLauncher::LaunchAgent,
                    Some(vec!["--flag1", "--flag2"]), /* 传递给应用程序的任意数量的参数 */
                ));
                let _ = handle.plugin(tauri_plugin_screenshots::init());
                let _ = handle.plugin(tauri_plugin_system_info::init());
                let _ = handle.plugin(tauri_plugin_cli::init());
                let _ = handle.plugin(tauri_plugin_global_shortcut::Builder::new().build());
                let _ = handle.plugin(tauri_plugin_positioner::init());
                let _ = handle.plugin(tauri_plugin_process::init());
                let _ = handle.plugin(tauri_plugin_shell::init());
                let _ = handle.plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}));
                let _ = handle.plugin(tauri_plugin_updater::Builder::new().build());
                let _ = handle.plugin(tauri_plugin_window_state::Builder::new().build());
                let _ = handle.plugin(tauri_plugin_centrifugo::init());
                let _ = handle.plugin(tauri_plugin_pty::init());
            }

            #[cfg(mobile)]
            {
                let _ = handle.plugin(tauri_plugin_barcode_scanner::init());
                let _ = handle.plugin(tauri_plugin_biometric::init());
                let _ = handle.plugin(tauri_plugin_nfc::init());
                let _ = handle.plugin(tauri_plugin_geolocation::init());
                let _ = handle.plugin(tauri_plugin_haptics::init());
            }

            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            ipc_channel,
            ipc_request,
            app_handle,
            webview_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use tauri_plugin_sql::{Migration, MigrationKind};
pub fn migration_sql() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: "CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, status TEXT);",
        kind: MigrationKind::Up,
    }]
}
