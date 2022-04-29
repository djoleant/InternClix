using Microsoft.EntityFrameworkCore;
using Models;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5500",
                                    "http://127.0.0.1:5500",
                                    "https://localhost:5500",
                                    "https://127.0.0.1:5500");
                      });
});

builder.Services.AddDbContext<IspitDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("InternClixCS"));
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
