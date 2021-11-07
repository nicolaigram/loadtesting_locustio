import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def index_page(self):
        self.client.get(url="/hello")

    @task
    def slow_page(self):
        self.client.get(url="/slow")
