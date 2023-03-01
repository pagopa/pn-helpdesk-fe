

export function downloadFile(data:string, ){
  const blob = new Blob([base64ToArrayBuffer(data)],
    {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = "ExcelDownload";
  link.click();
}


function base64ToArrayBuffer(base64:string) {
  let binaryString = window.atob(base64);
  let binaryLen = binaryString.length;
  let bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}