import { google } from "googleapis";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getTabela() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Tabela!A2:N",
  });

  const rows = response.data.values;
  if (!rows) return [];

  return rows.map((r) => {
    const pontos = Number(r[4]);
    const jogos = Number(r[5]);

    return {
      classificacao: Number(r[0]),
      nome: r[1],
      sigla: r[2],
      brasao: r[3],
      pontos,
      jogos,
      vitorias: Number(r[6]),
      empates: Number(r[7]),
      derrotas: Number(r[8]),
      golsPro: Number(r[9]),
      golsContra: Number(r[10]),
      saldoGols: Number(r[11]),
      grupo: r[12],
      classGrp: Number(r[13]),
    };
  });
}

export async function getProximosJogos() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "ProximosJogos!A2:J",
  });

  const rows = response.data.values;
  if (!rows) return [];

  return rows.map((r) => ({
    id: Number(r[0]),
    data: r[1],
    horario: r[2],
    local: r[3],
    mandante: r[4],
    siglaMandante: r[5],
    mandanteBrasao: r[6],
    visitante: r[7],
    siglaVisitante: r[8],
    visitanteBrasao: r[9],
  }));
}
