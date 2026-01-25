/*-------------------------------*/
/* ERROR CLASSIFIER ELEMENTS */
/*-------------------------------*/

// Hálózati hibák (pl. letöltés, kapcsolat bontás, DNS hiba)
const isNetworkError = (err) => {
  return (
    err.code === "ENOTFOUND" || // DNS hiba
    err.code === "ECONNRESET" || // kapcsolat bontva
    err.code === "ECONNREFUSED" || // kapcsolat elutasítva
    err.code === "ETIMEDOUT" || // kapcsolat timeout
    err.name === "RequestError" // pl. got modul hibája
  );
};

// Fájlkezelési hibák (file read/write, unlink, access)
// Ezek azok, amik retry-olhatók, mert sokszor átmeneti állapotot jeleznek.
const isFileHandlingError = (err) => {
  return (
    err.code === "EBUSY" || // fájl épp használatban
    err.code === "EMFILE" || // túl sok megnyitott fájl
    err.code === "ENOENT" || // fájl nem található
    err.code === "EPERM" || // nincs jogosultság
    err.code === "EACCES" // hozzáférés megtagadva
  );
};

// Alacsony szintű fájlrendszer hibák
// (ritkább, de előfordulhat, pl. eszközhiba, I/O error)
const isFileSystemError = (err) => {
  return (
    err.code === "EIO" || // input/output hiba
    err.code === "EAGAIN" // erőforrás átmenetileg nem elérhető
  );
};

//MongoDB IP Acces List-ben nincs meg az API által használt IP
const isMongoAuthError = (err) => {
  return (
    err.name === "MongooseServerSelectionError" ||
    err.name === "MongoServerSelectionError" ||
    err.message?.includes("whitelist") ||
    err.message?.includes("IP that isn't whitelisted")
  );
};

/*-------------------------------*/
/* MODUL EXPORT */
/*-------------------------------*/
export {
  isNetworkError,
  isFileHandlingError,
  isFileSystemError,
  isMongoAuthError,
};
