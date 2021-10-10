# RESTUFUL API dengan Node.JS + Express + Sequelize

Script basic RESTFUL API 

## Installation Awal

Gunakan langkah berikut untuk installasi

```textile
PRE-REQUIREMENT
- Pastikan Node sudah terinstall di local computer sebelum melalukan step dibawah ini
- Minimal Node.Js Versi 14.17.5

1. Buat Database baru di MS SQL Server yang ada beri nama restfulapi
2. Buat folder restfulsvr
3. Ketik command berikut dari terminal 
    :\>git clone https://github.com/JerryPeter/restfulapi.git . 
4. Sekarang pada folder kita sudah ada semua script hasil cloning dari GITHUB
5. Masuk kedalam directory baru RESTFULAPI
6. Edit configurasi koneksi ke database pada file config\config.json
7. Install paket npm yang diperlukan, dengan mengetikan command berikut dari terminal :\>npm install
8. Jalankan database migration dengan command berikut dari terminal :\>npx sequelize-cli db:migrate
- Step ini akan membuat struktur table yg diperlukan kedalam database yg telah disetting pada config
9. Setelah selesai coba running aplikasi dengan command berikut dari terminal :\>npm start
10. Buka browser dan akses dari url http:\\localhost:3000
```

## Cara pengunaan

Untuk pengunaan bisa diakses dari POSTMAN / INSOMNIA / THUNDER CLIENT dan lainnya

```textile
I. REGISTER NEW USER 
1. Gunakan API CREATE dengan Method POST untuk register user baru localhost:3000/users/create
2. Pada bagian body gunakan JSON berikut sebagai payload parameter
{
	"username":"mhealtbank",
	"password": "qwerty",
	"email":"user@mhealtbank.com",
	"fullname":"mhealtbank",
	"pic":"default.png",
	"bio":"[Detail Bio here]",
	"createdBy":0,
	"updatedBy":0,
	"isDeleted":false
}
Setelah sukses akan terima return respon berikut :
{
  "message": "Register user sukses ..."
}

II. OTORISASI PENGUNA
1. Gunakan API SignIn dengan method POST untuk login localhost:3000/users/signin
2. Pada bagian body gunakan JSON berikut sebagai payload parameter
{
    "email":"user@mhealtbank.com",
	"password":"qwerty"
}
3. Email dan password pastikan sama dengan yang ada pada step pertama diatas
4. Jika sukses akan terima return respon berikut :
{
  "message": "Authentication Sukses !!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWhlYWx0YmFuay5jb20iLCJ1c2VyaWQiOjEsImlhdCI6MTYzMzg2OTY1OX0.DDiDE3LOeHq8H4yluMKrLD1jZMTwBb08MHRnLts4l8A"
}
5. JWT Token diatas harus digunakan untuk proses2 selanjutnya dalam mengakses CRUD API

II. CRUD (CREATE, READ, UPDATE & DELETE) untuk data USER contoh pengunaan :
1. Sebelum mengakses CRUD DATA pastikan sudah login untuk mendapatkan JWT Token, karena token ini akan digunakan untuk identifikasi

CREATE = http:\\localhost:3000\create <-- Pakai POST Method
- Payload JSON parameter
{
	"username":"mhealtbank",
	"password": "qwerty",
	"email":"user@mhealtbank.com",
	"fullname":"mhealtbank",
	"pic":"default.png",
	"bio":"[Detail Bio here]",
	"createdBy":0,
	"updatedBy":0,
	"isDeleted":false
}

READ = http:\\localhost:3000\users <-- Pakai GET Method
- Pastikan masukan Bearer parameter mengunakan JWT Token yang didapat setelah login
- JWT Token digunakan untuk otorisasi data yg dapat dilihat


UPDATE = http:\\localhost:3000\users\1 <-- Pakai PATCH Method, dengan kirim data pada Body
- Pastikan masukan Bearer parameter mengunakan JWT Token yang didapat setelah login
- JWT Token digunakan untuk otorisasi data yg dapat diupdate

DELETE = http:\\localhost:3000\users\1 <-- Pakai DELETE Method, dengan kirim data pada Body
- Pastikan masukan Bearer parameter mengunakan JWT Token yang didapat setelah login
- JWT Token digunakan untuk otorisasi data yg dapat didelete

```

## Cara pengunaan

Jika mengunakan THUNDER CLIENT pada Visual Studio Code dapat mengunakan file thunder-collection_RESTULAPI.json
yang disertakan pada project ini untuk mencoba akses API yang ada


