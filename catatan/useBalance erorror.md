# jika eth balance tidak tampil solisi sbb:

## 📘 Catatan Wagmi: Kenapa `useBalance` pakai `isConnected ? address : undefined`

## 🔹 1. `useBalance()` membutuhkan sebuah address

Hook wagmi ini hanya bisa mengambil saldo jika diberikan alamat wallet
(`0x...`).

## 🔹 2. Saat pertama kali halaman dibuka, wallet belum connect

-   `isConnected = false`
-   `address = undefined`

Jika `useBalance({ address })` dijalankan saat `address = undefined`,
maka:

-   ❌ wagmi bisa error\
-   ❌ muncul warning\
-   ❌ fetch balance dilakukan percuma

------------------------------------------------------------------------

## 📌 3. Solusi: Berikan address hanya setelah wallet connect

``` js
const { data, isLoading } = useBalance({
  address: isConnected ? address : undefined,
});
```

### Arti kode:

-   Jika **isConnected = true** → kirimkan `address` ke `useBalance()`
-   Jika **belum connect** → kirim `undefined` → Wagmi STOP, tidak fetch
    balance

------------------------------------------------------------------------

## ✔ 4. Manfaatnya

-   **Aman** → tidak error sebelum wallet connect\
-   **Efisien** → tidak request ke blockchain tanpa alamat\
-   **UI bersih** → `useBalance` hanya aktif saat wallet aktif

------------------------------------------------------------------------

## 🎯 Kesimpulan singkat

**`useBalance()` hanya dijalankan kalau wallet sudah terhubung.\
Kalau belum, jangan fetch apa-apa.**
