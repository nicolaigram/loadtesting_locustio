import time
import random
from locust import HttpUser, task, between


class User(HttpUser):
    def __init__(self, parent):
        super(User, self).__init__(parent)
        self.token = ""

    wait_time = between(1, 2)

    def on_start(self):
        with self.client.get(url="/login") as response:
            self.token = response.json()["token"]

    @task
    def user_page(self):
        user_id = str(random.randint(0, 3))
        self.client.get(url="/users/" + user_id,
                        headers={"authorization": self.token},
                        name="Users"
                        )
