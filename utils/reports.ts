import { createReport } from "@/axios";
import { useAuthStore } from "@/stores";
import { createReportType, GenerateReportType, ReporteType } from "@/types";
import { downloadFile } from "./files";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

class ReportError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function generateReport(datos: createReportType, token: string) {
  try {
    console.log(datos.data.length)
    if (datos.data.length === 0) {
      throw new ReportError("No hay datos para generar el reporte");
    }
    
    const request: ReporteType = await createReport(datos, token);

    await downloadFile(request.file);

    return {
      error: false,
      message: "Reporte generado correctamente",
      reporte: request,
    } as GenerateReportType;
  } catch (error: any | ReportError) {

    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.message,
    })
    return {
      error: true,
      message: error.message,
    } as GenerateReportType;
  }
}
