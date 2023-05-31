#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <LittleFS.h>
#include <ESPAsyncWebServer.h>
#include <WiFiUdp.h>
#include "ESPAsyncUDP.h"
#include <ArduinoJson.h>

/* #define SSID "nazwa sieci"
#define PASS "hasło sieci" */

/* #define SSID "PK-link"
#define PASS "mafiaWIEIK" */

/* #define SSID "Internet_Domowy"
#define PASS "BD30355E" */

/* #define SSID "FunBox2-5A43"
#define PASS "DC975CCE329F5AE56D274DF9CD" */

// #define SSID "Redmi Note 8T"
// #define PASS "kormoran_07"

/* #define SSID "Galaxy S20"
#define PASS "kiziamizia" */

#define RELAY D5
#define RELAY_2 D6

unsigned int UdpPort = 7070;
WiFiUDP UDP;

int paczkaDanych;
char dataPackage[255];
String battery_percentage;

AsyncWebServer serwer(80);

AsyncUDP udp;
IPAddress localIp(192, 168, 0, 17);
IPAddress gateway(192, 168, 0, 0);
IPAddress subnet(255, 255, 255, 0);

void battery_check()
{
  // Open the file
  File bat_per_value = LittleFS.open("/bat_per_val.js", "w");

  // String js_file = "setInterval(() => {  localStorage.setItem(\"battery_percentage_value\", "+ battery_percentage +"); }, 1000); console.log(\"Nadpisane\");";

  // Write to the file
  // bat_per_value.print(js_file);
  bat_per_value.print("setInterval(() => {  localStorage.setItem(\"battery_percentage_value\", ");
  bat_per_value.print(battery_percentage);
  bat_per_value.print("); }, 1000); ");
  bat_per_value.println("console.log(\"Nadpisane\");");

  // Close the file
  bat_per_value.close();
}

void setup()
{
  pinMode(RELAY, OUTPUT);
  digitalWrite(RELAY, LOW);
  pinMode(RELAY_2, OUTPUT);
  digitalWrite(RELAY_2, LOW);

  Serial.begin(115200);
  LittleFS.begin();
  UDP.begin(UdpPort);

  //--------------------------------        WiFi config       --------------------------------//
  WiFi.begin(SSID, PASS);
  WiFi.config(localIp, gateway, subnet);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\nAdres IP:");
  Serial.println(WiFi.localIP());

  { //--------------------------------        reqests       --------------------------------//

    //----- websites -----//
    serwer.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/index.html"); });

    serwer.on("/index.html", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/index.html"); });

    serwer.on("/power.html", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/power.html"); });

    serwer.on("/cooler.html", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/cooler.html"); });

    serwer.on("/data_analysys.html", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/data_analysys.html"); });

    serwer.on("/settings.html", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/settings.html"); });

    //----- js files -----//
    serwer.on("/time.js", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/time.js"); });

    serwer.on("/power_control.js", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/power_control.js"); });

    serwer.on("/quotes.js", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/quotes.js"); });

    serwer.on("/bat_per_val.js", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/bat_per_val.js"); });

    serwer.on("/jquery-3.6.1.min.js", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/jquery-3.6.1.min.js"); });

    //----- css files -----//
    serwer.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/style.css"); });

    serwer.on("/css/fontello.css", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/css/fontello.css"); });

    serwer.on("/font/fontello.woff", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/font/fontello.woff"); });

    serwer.on("/font/fontello.woff2", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/font/fontello.woff2"); });

    serwer.on("/font/fontello.ttf", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/font/fontello.ttf"); });

    serwer.on("/img/PG_logo.png", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(LittleFS, "/img/PG_logo.png"); });

    //----- control -----//
    serwer.on("/relay_lap_on", HTTP_GET, [](AsyncWebServerRequest *request)
              {  
    digitalWrite(RELAY, HIGH);
    request->send(200); });

    serwer.on("/relay_lap_off", HTTP_GET, [](AsyncWebServerRequest *request)
              {  
    digitalWrite(RELAY, LOW);
    request->send(200); });

    serwer.on("/relay_andr_on", HTTP_GET, [](AsyncWebServerRequest *request)
              {  
    digitalWrite(RELAY_2, HIGH);
    request->send(200); });

    serwer.on("/relay_andr_off", HTTP_GET, [](AsyncWebServerRequest *request)
              {  
    digitalWrite(RELAY_2, LOW);
    request->send(200); });

    //--------------------------------        UDP       --------------------------------//

    serwer.on("/lap_cooler_on", HTTP_GET, [](AsyncWebServerRequest *request)
              { 
    request->send(200);
     udp.broadcastTo("lap_cooler_on", 1237); });

    if (udp.listenMulticast(IPAddress(239, 1, 2, 3), 1237))
    {
      /*         Serial.print("UDP Listening on IP: ");
              Serial.println(WiFi.localIP()); */

      udp.onPacket([](AsyncUDPPacket packet)
                   {
                     /*             Serial.print("UDP Packet Type: ");
                                 Serial.print(packet.isBroadcast()?"Broadcast":packet.isMulticast()?"Multicast":"Unicast");
                                 Serial.print(", From: ");
                                 Serial.print(packet.remoteIP());
                                 Serial.print(":");
                                 Serial.print(packet.remotePort());
                                 Serial.print(", To: ");
                                 Serial.print(packet.localIP());
                                 Serial.print(":");
                                 Serial.print(packet.localPort());
                                 Serial.print(", Length: ");
                                 Serial.print(packet.length());
                                 Serial.print(", Data: "); */

                     /*             Serial.write(packet.data(), packet.length());
                                 Serial.println();
                                 //reply to the client
                                 packet.printf("Got %u bytes of data", packet.length()); */ });
      /*         //Send multicast
              udp.print("Hello!"); */
    }
  }

  serwer.begin();
}

void loop()
{
  //--------------------------------        UDP       --------------------------------//

  paczkaDanych = UDP.parsePacket();
  if (paczkaDanych)
  {
    int len = UDP.read(dataPackage, 255);
    if (len > 0)
      dataPackage[len] = 0;
    battery_percentage = dataPackage;
    Serial.print(battery_percentage);
    Serial.print(" ");
    battery_check();
  }
}
