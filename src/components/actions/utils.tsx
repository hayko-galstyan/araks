import { errorMessage } from 'helpers/utils';

type GetProjectId = (path?: string) => string;

const getProjectId: GetProjectId = (path = location.pathname) => path.substring(path.lastIndexOf('/') + 1);

export async function DownloadFile(
  nodeTypeIds: string[],
  isPDF = false,
  token: string,
  nodeId?: string,
  fileName?: string
) {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
    const nodeIdQuery = `nodeId=${nodeId}`;
    const excelEndpoint = `${baseUrl}projects-node-types/export-excel/${getProjectId()}`;
    const pdfEndpoint = `${baseUrl}nodes/export-pdf/${nodeId}`;

    const pdfFileURL = `${pdfEndpoint}?${nodeIdQuery}`;
    const url = nodeId ? pdfFileURL : excelEndpoint;

    const headers: { [key: string]: string } = {
      Authorization: token,
    };

    if (isPDF) {
      headers['Content-Type'] = 'application/pdf';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    const body = nodeId
      ? undefined
      : JSON.stringify({
          project_type_ids: nodeTypeIds,
        });

    const response = await fetch(url, { method: isPDF ? 'GET' : 'POST', headers, body });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName as string);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    errorMessage(error);
  }
}
