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

      HttpSession session = request.getSession();
      if(session.isNew()) {
          response.setContentType("text/html; charset=\"UTF-8\"");
          PrintWriter servletOut = response.getWriter();
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
               " <form method='post'><div>\n"+
                 " <label>\n"+
                   " Please sign in: <input type='text' name='signIn' />\n"+
                  "</label>\n"+
                 "<br />\n"+
                "<input type='submit' name='doit' value='Sign In' />\n"+
               " </div></form>\n"+
              "</body>\n"+
            "</html>\n");
          servletOut.close();
      } else { //session is not new
          String signIn = session.getAttribute("signIn").toString();
          if(request.getParameter("result")) {
            String result = request.getParameter("result").toString();
            response.sendRedirect("GameSelect.html?signIn="+signIn+"&result="+result);
          } else {
            response.sendRedirect("GameSelect.html?signIn="+signIn);
          }
      }
     }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
//idea: append signin as query to a redirected URL and then
//retrieve the sign in from the url with javascript

      String signIn = request.getParameter("signIn");
      PrintWriter servletOut = response.getWriter();
      servletOut.println(signIn);
      HttpSession session = request.getSession();
      if(signIn!=null) {
        session.setAttribute("signIn", signIn);
        response.sendRedirect("GameSelect.html?signIn="+signIn);
      }
    }
}
