from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class AnalisisSangre(BaseModel):
    hemoglobina: float
    hematocrito: float
    globulos_rojos: float
    vcm: float


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/analisis")
def analizar_sangre(datos: AnalisisSangre):
    if datos.hemoglobina < 12:
        diagnostico = "Posible anemia detectada"
        nivel = "Baja hemoglobina"
        recomendacion = "Se recomienda consultar a un profesional de la salud."
    else:
        diagnostico = "Valores dentro de rango normal"
        nivel = "Normal"
        recomendacion = "No se observan signos preliminares de anemia."

    return {
        "diagnostico": diagnostico,
        "nivel": nivel,
        "recomendacion": recomendacion
    }