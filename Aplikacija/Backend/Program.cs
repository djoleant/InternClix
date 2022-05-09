using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

var CORS = "_cors";
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5500",
                                    "http://127.0.0.1:5500",
                                    "https://localhost:5500",
                                    "https://127.0.0.1:5500",
                                    "http://localhost:3000/")
                                    .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowAnyOrigin();
                          // policy.AllowAnyOrigin();
                          // policy.AllowAnyHeader();
                      });
});



builder.Services.AddDbContext<InternClixDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("InternClixCS"));
});

// Add builder.Services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<InternClixDbContext>();
//.AddDefaultTokenProviders();


//builder.Services.AddIdentityServer()
// .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
//.AddCookie radi 

builder.Services.AddAuthentication();
//.AddCookie radi 

//

builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = $"/Login";
                options.LogoutPath = $"/Auth/Logout";

                options.AccessDeniedPath = "/AccessDenied";
                options.Cookie.Name = "UserAuthCookie";
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
                options.SlidingExpiration = true;
            });
builder.Services.Configure<IdentityOptions>(options =>
{
                // Default Password settings.
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
    options.User.AllowedUserNameCharacters =
"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
});

// builder.Services.AddAntiforgery(options =>
//             {
//                 options.HeaderName = "X-CSRF-TOKEN";
//                 options.SuppressXFrameOptionsHeader = false;
//             });

var app = builder.Build();

// app.Use((context, next) =>
//             {
//                 string path = context.Request.Path.Value;

//                 if (
//                     string.Equals(path, "/", StringComparison.OrdinalIgnoreCase) ||
//                     string.Equals(path, "/index.html", StringComparison.OrdinalIgnoreCase))
//                 {
//                     // The request token can be sent as a JavaScript-readable cookie, 
//                     // and Angular uses it by default.
//                     var tokens = antiforgery.GetAndStoreTokens(context);
//                     context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
//                         new CookieOptions() { HttpOnly = false });
//                 }

//                 return next(context);
//             });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(CORS);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
