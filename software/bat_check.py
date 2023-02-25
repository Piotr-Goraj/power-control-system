
import psutil
import socket
import time

# time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)

""" def convertTime(seconds):
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return "%d:%02d:%02d" % (hours, minutes, seconds) """

""" if __name__ == '__main__':
    while True:
        file = open("bat_status.txt", "w")
        file.write("Battery percentage : ")
        file.write(str(battery.percent))
        file.write("\n")
        file.write("Power plugged in : ")
        file.write(str(battery.power_plugged))
        file.write("\n") """

# coś w tym ifie jest źle
"""         if str(battery.secsleft) != "BatteryTime.POWER_TIME_UNLIMITED":
            file.write(str(convertTime(battery.secsleft)))
            print(str(convertTime(battery.secsleft)))
        else:
            file.write("Charging")
            print("Charging")

        file.write("\n")

        file.close()
        time.sleep(1) """


while True:
    battery = psutil.sensors_battery()
    percentage = battery.percent
    percentage = str(percentage)

    UDP_IP = "192.168.0.17"
    UDP_PORT = 7070
    MESSAGE = str.encode(percentage)

    # print("UDP target IP: %s" % UDP_IP)
    # print("UDP target port: %s" % UDP_PORT)
    print("message: %s" % MESSAGE)
    
    sock = socket.socket(socket.AF_INET, # Internet
                        socket.SOCK_DGRAM) # UDP
    sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
    sock.close()

    time.sleep(1)