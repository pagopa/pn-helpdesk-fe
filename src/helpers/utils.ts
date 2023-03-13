

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

export const calcSha256String = (file: any): Promise<{ hashHex: string; hashBase64: string }> => {
  // this is because in jest crypto is undefined and test fails due to resolve in onload function
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({ hashHex: 'mocked-hashHex', hashBase64: 'mocked-hasBase64' });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const hashBuffer = await crypto.subtle.digest('SHA-256', reader.result as ArrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = window.btoa(String.fromCharCode(...hashArray)); // convert bytes to base64 string
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        resolve({ hashHex, hashBase64 });
      } catch {
        reject();
      }
    };
    reader.onerror = () => {
      reject();
    };
  });
};