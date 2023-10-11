#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <LittleFS.h>
#include <ESPAsyncWebServer.h>
// #include <WiFiUdp.h>

#define SSID "Internet_Domowy"
#define PASS "BD30355E"

#define socket1 D5
#define socket2 D6
#define socket3 D7
#define socket4 D8

AsyncWebServer serwer(80);

IPAddress localIp(192, 168, 0, 17);
IPAddress gateway(192, 168, 0, 0);
IPAddress subnet(255, 255, 255, 0);

void setup()
{

  //                         <<-------- PIN state -------->>
  pinMode(socket1, OUTPUT);
  digitalWrite(socket1, LOW);
  pinMode(socket2, OUTPUT);
  digitalWrite(socket2, LOW);
  pinMode(socket3, OUTPUT);
  digitalWrite(socket3, LOW);
  pinMode(socket4, OUTPUT);
  digitalWrite(socket4, LOW);

  Serial.begin(115200);
  LittleFS.begin();

  //                         <<-------- WiFi config -------->>
  WiFi.begin(SSID, PASS);
  WiFi.config(localIp, gateway, subnet);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\nAdres IP:");
  Serial.println(WiFi.localIP());

  //                         <<-------- REST API -------->>

  //        <<-------- web-app -------->>
  serwer.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/index.html"); });

  //        <<-------- contents -------->>
  serwer.on("/contents/power-content.html", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/contents/power-content.html"); });

  serwer.on("/contents/cooling-content.html", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/contents/cooling-content.html"); });

  serwer.on("/contents/analysys-content.html", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/contents/analysys-content.html"); });

  serwer.on("/contents/settings-content.html", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/contents/settings-content.html"); });

  //        <<-------- fonts -------->>

  //        <<-------- images -------->>
  serwer.on("/images/logo_power_management.png", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/images/logo_power_management.png"); });

  serwer.on("/images/PG_logo.png", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/images/PG_logo.png"); });

  serwer.on("/favicon.ico", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/images/favicon.ico"); });

  //        <<-------- JSONs -------->>
  serwer.on("/data/JSONs/quotes.json", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/JSONs/quotes.json"); });

  //        <<-------- scripts -------->>
  serwer.on("/jquery-3.7.1.min.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/jquery-3.7.1.min.js"); });

  serwer.on("/scripts/app.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/scripts/app.js"); });

  serwer.on("/scripts/PowerPage.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/scripts/PowerPage.js"); });

  serwer.on("/scripts/Navbar.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/scripts/Navbar.js"); });

  serwer.on("/scripts/HomePage.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/scripts/HomePage.js"); });

  serwer.on("/scripts/UI/title.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/scripts/UI/title.js"); });

  //        <<-------- styles -------->>
  serwer.on("/styles/shared/html-tags.css", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/styles/shared/html-tags.css"); });

  serwer.on("/styles/shared/leyout.css", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/styles/shared/leyout.css"); });

  serwer.on("/styles/shared/elements.css", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(LittleFS, "/styles/shared/elements.css"); });

  //        <<-------- control -------->>
  serwer.on("/socket1-on", HTTP_GET, [](AsyncWebServerRequest *request)
            {   
              digitalWrite(socket1, HIGH);
              request->send(200); });

  serwer.on("/socket1-off", HTTP_GET, [](AsyncWebServerRequest *request)
            {   
              digitalWrite(socket1, LOW);
              request->send(200); });

  serwer.begin();
}

void loop()
{
}