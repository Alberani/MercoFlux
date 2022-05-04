#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>
#include "DHT.h"

#define DHTPIN A1
#define LM35PIN A5
#define LUMIPIN A0
#define CHAVPIN 7

DHT dht(DHTPIN, DHT11);

void setup(){
    pinMode(DHTPIN, INPUT);
    pinMode(CHAVPIN, INPUT);
    Serial.begin(9600);
    dht.begin();
}

void loop(){
    float dht11_umidade = dht.readHumidity();
    float dht11_temperatura = dht.readTemperature();
    Serial.print(dht11_umidade);
    Serial.print(";");
    Serial.print(dht11_temperatura);
    Serial.print(";");

    float luminosidade = analogRead(LUMIPIN);
    Serial.print(luminosidade);
    Serial.print(";");

    float lm35_temperatura = analogRead(LM35PIN);
    lm35_temperatura = lm35_temperatura * 0.00488;
    lm35_temperatura = lm35_temperatura * 100;
    Serial.print(lm35_temperatura);
    Serial.print(";");

    int chave = digitalRead(7);
    if (chave == 0){
        Serial.print("1");
    }
    else{
        Serial.print("0");
    }
    
    Serial.println();

    delay(1000);
}