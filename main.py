import requests
import redis
import json
from fastapi import FastAPI

rd = redis.Redis(host="localhost", port=6379, db=0)

app = FastAPI()

@app.get("/")
def read_root():
  return "Hello World"

@app.get("/fish/{species}")
def read_fish(species: str):
  cache = rd.get(species)
  if cache:
    print("cache hit")
    return json.loads(cache)
  else:
    print("cache miss")
    r = requests.get(f"https://www.fishwatch.gov/api/species/{species}")
    rd.set(species, r.text)
    rd.expire(species, 5)
    return r.json()