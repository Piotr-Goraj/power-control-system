
#include <ESP8266WiFi.h>
#include "ESPAsyncUDP.h"

#define SSID "nazwa sieci"
#define PASS "hasło sieci"

AsyncUDP udp;

#define cooler D5

String cooler_on;

void setup()
{
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    WiFi.begin(SSID, PASS);
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {
        Serial.println("WiFi Failed");
        while(1) {
            delay(1000);
        }
    }
    if(udp.listenMulticast(IPAddress(239,1,2,3), 1237)) {

/*         Serial.print("UDP Listening on IP: ");
        Serial.println(WiFi.localIP()); */
        
        udp.onPacket([](AsyncUDPPacket packet) {

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
            Serial.print(", Data: ");
            
            Serial.write(packet.data(), packet.length());
            Serial.println();
            //reply to the client 

            packet.printf("Got %u bytes of data", packet.length());
*/

            char buf[packet.length()+1] = {};
               memcpy(buf, packet.data(), packet.length());
               cooler_on = String(buf);

        });
    }
}

void loop()
{

    if (cooler_on == "lap_cooler_on")
    {
      digitalWrite(cooler, HIGH);
      cooler_on = "null";
    }
}
