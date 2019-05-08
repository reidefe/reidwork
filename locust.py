from locust import HttpLocust, TaskSet, task

class Userbehaviour(TaskSet):
   

    @task(5)
    def index(self):
        self.client.get("/")

    @task(2)
    def events(self):
        self.client.get("/events")

    @task(2)
    def grants(self):
        self.client.get("/grants")

    @task(2)
    def compwtitions(self):
        self.client.get("/competitions")

    @task(2)
    def projects(self):
        self.client.get("/projects")

    @task(2)
    def dotations(self):
        self.client.get("/dotations")

    @task(2)
    def nodes(self):
        self.client.get("/nodes")

    @task(1)
    def profile(self):
        self.client.get("/profile")

class WebsiteUser(HttpLocust):
    task_set = Userbehaviour
    min_wait = 1000
    max_wait = 4000
