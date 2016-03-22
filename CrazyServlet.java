import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/**
 * Hello World! servlet
 */
@WebServlet( urlPatterns={"/CrazyServlet"} )
public class CrazyServlet extends HttpServlet { 
    /**
     * Respond to any HTTP GET request with an 
     * HTML Hello World! page.
     */
    public void doGet (HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException
      {
          // Set the HTTP content type in response header
          response.setContentType("text/html; charset=\"UTF-8\"");
          
          // Obtain a PrintWriter object for creating the body
          // of the response
          PrintWriter servletOut = response.getWriter();
          //response.sendRedirect("Login.html");
          // Create the body of the response
          // 
          // 

          servletOut.println(
          "<!DOCTYPE html> \n " +
 "<html xmlns='http://www.w3.org/1999/xhtml'> \n" +
 " <head> \n "+
   " <title> \n"+
      "Crazy Eights Sign-in!"+
    "</title>\n"+
      "<link rel=\"stylesheet\" href=\"MVPGame/style3.css\" type=\"text/css\"> \n"+
  "</head>\n"+
  "<body>\n"+
   " <form method='post' action='GameSelect.html'><div>\n"+
     " <label>\n"+
       " Please sign in: <input type='text' name='signIn' />\n"+
      "</label>\n"+
     "<br />\n"+
    "<input type='submit' name='doit' value='Sign In' />\n"+
   " </div></form>\n"+
  "</body>\n"+
"</html>\n");
          servletOut.close();
     }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {

      String signIn = request.getParameter("signIn");
      HttpSession session = request.getSession();
      if(signIn!=null) {
        session.setAttribute("signIn", signIn);
      }
    }
}
