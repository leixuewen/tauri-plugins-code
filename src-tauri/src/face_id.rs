use crate::try_result;
use face_id::analyzer::{FaceAnalysis, FaceAnalyzer};
use tauri::ipc::Response;

static mut FACE: Option<FaceAnalyzer> = None;

fn get_face() -> Result<&'static mut FaceAnalyzer, String> {
    unsafe {
        match FACE {
            Some(ref mut face) => Ok(face),
            None => Err("not init face".into()),
        }
    }
}

#[tauri::command]
pub async fn face_id_init(models: Vec<&str>) -> Result<Response, String> {
    log::debug!("models: {:?}", models);
    try_result(|| {
        if models.len() != 3 {
            return Err(format!("expected 3 models: {:?}", models).into());
        }
        let resp = Response::new(vec![]);
        if get_face().is_ok() {
            log::info!("face_id initialized");
            return Ok(resp);
        }
        log::info!("initializing face_id");
        let face = FaceAnalyzer::builder(models[1], models[2], models[0]).build()?;
        unsafe { FACE = Some(face) }
        Ok(resp)
    })
}

#[tauri::command]
pub async fn face_id_analyzer(buffer: Vec<u8>) -> Result<Vec<FaceAnalysis>, String> {
    try_result(|| {
        let face = get_face()?;
        let img = image::load_from_memory(buffer.as_slice())?;
        Ok(face.analyze(&img)?)
    })
}
