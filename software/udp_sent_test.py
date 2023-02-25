
import socket

ip = str(socket.gethostbyname(socket.gethostname()))
print(ip)
if __name__ == '__main__':
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('', 7070))
    while(True):
        data_rec=sock.recvfrom(1024)
        message=data_rec[0].decode('UTF-8')
        print(message)