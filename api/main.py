from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AnalisisSangre(BaseModel):
    hemoglobina: float
    hematocrito: float
    globulosRojos: float
    vcm: float
    hcm: float
    chcm: float


@app.post("/analisis")
def analizar_sangre(datos: AnalisisSangre):

    resultados = {}
    alertas = []
    estado_general = "Normal"

    # ----- RANGOS DE REFERENCIA DE UNA PERSONA PROMEDIO -----

    rangos = {
        "hemoglobina": (12.0, 17.5),
        "hematocrito": (36.0, 52.0),
        "globulosRojos": (4.0, 6.0),
        "vcm": (80.0, 100.0),
        "hcm": (27.0, 33.0),
        "chcm": (30.0, 36.0)
    }

    # ----- FUNCIÓN PARA EVALUAR -----
 
    def evaluar(nombre, valor):
        minimo, maximo = rangos[nombre]

        if valor < minimo:
            return "Bajo"
        elif valor > maximo:
            return "Alto"
        else:
            return "Normal"

    # ----- EVALUAMOS LOS 6 CAMPOS -----

    datos_dict = datos.model_dump()

    for campo, valor in datos_dict.items():
        resultado = evaluar(campo, valor)
        resultados[campo] = {
            "valor": valor,
            "estado": resultado
        }

        if resultado != "Normal":
            alertas.append(f"{campo} en nivel {resultado}")
            estado_general = "Alterado"

    # ----- RECOMENDACIÓN GLOBAL -----

    if estado_general == "Normal":
        recomendacion = (
            "Todos los parámetros están dentro de rango. "
            "Mantener alimentación equilibrada y controles anuales."
        )
    else:
        recomendacion = (
            "Se detectaron valores fuera de rango. "
            "Se recomienda evaluación médica para diagnóstico preciso."
        )

    return {
        "status": "Análisis Completado",
        "estado_general": estado_general,
        "detalle_parametros": resultados,
        "alertas": alertas,
        "recomendacion": recomendacion
    }