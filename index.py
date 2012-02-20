import webapp2
import jinja2

import os

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class HomeHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render())
        
      
app = webapp2.WSGIApplication([('/', HomeHandler)], debug = True)    
    
def main():
    app.run()
    
if __name__ == "__main__":
    main()