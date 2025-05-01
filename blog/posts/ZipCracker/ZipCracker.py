"""
ZipCracker - Script para realizar fuerza bruta sobre archivos ZIP con una lista de contraseñas.

Descripción: Este script intenta extraer un archivo ZIP protegido por contraseña probando cada contraseña de una lista proporcionada hasta que encuentra la correcta. Originalmente creado para un CTF de Immune Institute.

Uso: python ZipCracker.py <archivo_zip> <archivo_txt>

Argumentos:
- <archivo_zip> -> Localización del archivo ZIP protegido por contraseña.
- <archivo_txt> -> Localización del archivo TXT que contiene las contraseñas a probar.

Autora: Ellie Colorado
"""

import zipfile
import sys
import os

def test_passwords(zip_file, pass_list):
    with open(pass_list, 'r') as file:
        passwords = file.readlines()
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        for password in passwords:
            password = password.strip()
            try:
                zip_ref.extractall(pwd=password.encode('utf-8'))
                print(f"\Contraseña para \"{zip_file}\" encontrada en \"{pass_list}\": {password}")
                return password
            except Exception as e:
                pass
    print(f"\Contraseña para \"{zip_file}\" no encontrada en \"{pass_list}\"." )
    return None

def main():
    if len(sys.argv) == 3:
        zip_file = sys.argv[1]
        pass_list = sys.argv[2]
        
        if(not zip_file.endswith(".zip") or not pass_list.endswith(".txt")):
            if(not zip_file.endswith(".zip")):
                print(f"\tError: El primer argumento \"{zip_file}\" no es un archivo .zip.")
            if(not pass_list.endswith(".txt")):
                print(f"\tError: El segundo argumento \"{pass_list}\" no es un archivo .txt.")
        elif(not os.path.exists(zip_file) or not os.path.exists(pass_list)):
            if(not os.path.exists(zip_file)):
                print(f"\tError: El archivo \"{zip_file}\" no existe.")
            if(not os.path.exists(pass_list)):
                print(f"\tError: El archivo \"{pass_list}\" no existe.")
            
            
        else: test_passwords(zip_file, pass_list)
        
    else: print("python ZipCracker.py <zip_file> <pass_list>\n<zip_file> -> Path to the password-protected ZIP file.\n<pass_list> -> Path to the file containing the list of passwords to try.")
if __name__ == "__main__":
    main()