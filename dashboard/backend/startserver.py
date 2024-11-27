import os
import subprocess

def run_command(command):
    """Run a system command."""
    process = subprocess.Popen(command, shell=True)
    process.wait()

def setup():
    print("Setting up the Django project...")
    print("Installing dependencies...")
    run_command("pip install -r requirements.txt")
    print("Running migrations...")
    run_command("python3 manage.py migrate")
    print("Running tests...")
    run_command("python3 manage.py test")
    print("Starting the Django development server...")
    run_command("python3 manage.py runserver 0.0.0.0:8000")

if __name__ == "__main__":
    setup()
