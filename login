<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Client Portal | Bejja Loan Credit</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet">

<style>

body{

background:linear-gradient(135deg,#0F4C81,#2563EB);

font-family:Poppins,sans-serif;

height:100vh;

display:flex;

justify-content:center;

align-items:center;

}

.login-card{

width:430px;

border:none;

border-radius:20px;

box-shadow:0 20px 40px rgba(0,0,0,.25);

overflow:hidden;

}

.logo{

font-size:60px;

color:#0F4C81;

}

.form-control{

height:50px;

border-radius:12px;

}

.btn-login{

height:50px;

border-radius:12px;

font-size:18px;

font-weight:600;

}

</style>

</head>

<body>

<div class="card login-card">

<div class="card-body p-5">

<div class="text-center mb-4">

<i class="fa-solid fa-building-columns logo"></i>

<h3 class="fw-bold mt-3">

BEJJA LOAN CREDIT

</h3>

<p class="text-muted">

Client Portal

</p>

</div>

<form>

<div class="mb-3">

<label>

Phone Number

</label>

<div class="input-group">

<span class="input-group-text">

<i class="fa-solid fa-phone"></i>

</span>

<input

type="tel"

class="form-control"

placeholder="07XXXXXXXX"

required>

</div>

</div>

<div class="mb-3">

<label>

Password

</label>

<div class="input-group">

<span class="input-group-text">

<i class="fa-solid fa-lock"></i>

</span>

<input

type="password"

class="form-control"

placeholder="Enter Password"

required>

</div>

</div>

<div class="d-flex justify-content-between mb-4">

<a href="forgot-password.html">

Forgot Password?

</a>

</div>

<button

class="btn btn-success w-100 btn-login">

Login

</button>

</form>

<hr>

<div class="text-center">

Don't have an account?

<br><br>

<a

href="register.html"

class="btn btn-outline-primary rounded-pill">

Create New Account

</a>

</div>

</div>

</div>

</body>

</html>
