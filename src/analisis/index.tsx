import {LabInputField} from "./componentes"
export const FormularioParaAnalisisDeResultados = () => (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-400 bg-white p-4 shadow-sm">
        <p className="mb-4 text-base font-semibold text-gray-700">
          Ingrese sus valores de laboratorio
        </p>
        <div className="grid grid-cols-2 gap-4">
          <LabInputField
            label="Hemoglobina"
            unit="g/dL"
            value={labValues.hemoglobina}
            onChange={handleInputChange}
            fieldName="hemoglobina"
          />
          <LabInputField
            label="Hematocrito"
            unit="%"
            value={labValues.hematocrito}
            onChange={handleInputChange}
            fieldName="hematocrito"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <LabInputField
            label="Glóbulos Rojos"
            unit="M/μL"
            value={labValues.globulosRojos}
            onChange={handleInputChange}
            fieldName="globulosRojos"
          />
          <LabInputField
            label="VCM"
            unit="fL"
            value={labValues.vcm}
            onChange={handleInputChange}
            fieldName="vcm"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <LabInputField
            label="HCM"
            unit="pg"
            value={labValues.hcm}
            onChange={handleInputChange}
            fieldName="hcm"
          />
          <LabInputField
            label="CHCM"
            unit="g/dL"
            value={labValues.chcm}
            onChange={handleInputChange}
            fieldName="chcm"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleAnalyze}
          className="rounded-md border border-gray-400 bg-gray-200 px-6 py-2 font-medium text-gray-800 shadow-sm hover:bg-gray-300">
          Analizar sangre
        </button>
      </div>

      <div className="pt-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">
          Suba una foto o PDF (máx. 10 MB) para análisis:
        </p>

        <div className="shadow-inner flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-400 bg-white p-6">
          <input
            id="file-upload"
            type="file"
            accept=".pdf, image/jpeg, image/png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer items-center rounded-md border border-indigo-800 bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg hover:bg-indigo-700">
            <UploadIcon className="mr-2 h-5 w-5" />
            {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
          </label>

          {selectedFile && (
            <p className="mt-3 text-center text-sm text-green-600">
              Archivo seleccionado: <strong>{selectedFile.name}</strong> (
              {Math.round(selectedFile.size / 1024)} KB)
            </p>
          )}

          {errorMessage && (
            <p className="mt-3 text-center text-sm text-red-600">Error: {errorMessage}</p>
          )}

          {!selectedFile && !errorMessage && (
            <p className="mt-2 text-center text-xs text-gray-500">
              Formatos aceptados: PDF, JPG, PNG.
            </p>
          )}
        </div>
      </div>
    </div>
  );