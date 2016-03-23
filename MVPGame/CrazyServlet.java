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
     *
     * If we see a get with no session, display the login page
     * they will then send back a username througha post and the server will store the username
     * then the server will respond with the stats page and the corresponding welcome message
     *
     * modify the GameSelect.html to include in the url as a query string the game number
     *   in the game we need to extract the seed (deck, already done)
     *                       also need to extract the game that they played (game#)
     *                       when someone wins, send a get request to the server with the game number, the result of the game, num cards played, 
     *   the servlet 
     *
     * need data structures for each of the statistics?
     */
    
    String[] gameWinners = new String[5];
    //need number of cards played for that winner
    //need the percentage of players that won the game
    //number of times that game was played. 
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
          // String signIn = session.getAttribute("signIn").toString();
          // if(request.getParameter("result") !=null) {
          //   String result = request.getParameter("result").toString();
          //   response.sendRedirect("GameSelect.html?signIn="+signIn+"&result="+result);
          // } else {
          //   response.sendRedirect("GameSelect.html?signIn="+signIn);
          // }
          // 
          String signIn = session.getAttribute("signIn").toString();
          String welcome = "";//generate this string based on whether they won or lost
          String result = request.getParameter("result");
          String cardsPlayed = request.getParameter("cardsPlayed");
          if(result.equals("won")) {
            welcome = "Congratularions, " + signIn + "! Play again?";
          } else {
            welcome = "Sorry, " + signIn + ", better luck next time!";
          }

                String gameSelect = "<!DOCTYPE html>\n " +
        "<html>\n " +
        "<head>\n " +
         " <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">\n " +
         " <title>Select a Game</title>\n " +
         " </script>\n " +
         " <style type=\"text/css\">\n " +
         "   col { width:20%; }\n " +
         "   td,th  { text-align: center; }\n " +
         "   table, td, th { border: 1px solid gray }\n " +
         " </style>\n " +
         "   <link rel=\"stylesheet\" href=\"MVPGame/style2.css\" type=\"text/css\">\n " +
         " <meta name=\"generator\" content=\"Amaya, see http://www.w3.org/Amaya/\">\n " +
        "</head>\n " +
        "<body>\n " +
        "<h1><span id=\"title\">Crazy Eights</span></h1>\n " +
        "<h1>"+welcome+"</h1>\n " +
        "<table>\n " +
          "<caption\n " +
          "style=\"border:dashed; border-color:blue; padding:5px; margin:5px;\">Choose\n " +
          "from any of the hands below to play Crazy Eights and possibly get your name\n " +
          "on the board!</caption>\n " +
          "<colgroup><col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "</colgroup>\n " +
          "<tbody>\n " +
            "<tr>\n " +
            "  <th>Hand</th>\n " +
            "  <th>Players</th>\n " +
            "  <th>% Players<br>\n " +
            "    winning</th>\n " +
             " <th>Fewest cards<br>\n " +
             "   played in win</th>\n " +
             " <th>Player playing<br>\n " +
            "    fewest cards</th>\n " +
            "</tr>\n " +
            "<tr>\n " +
            "  <td><a href=\"MVPGame/Crazy8_2.html?seed=0x6904acd2\">1</a></td>\n " +
            "  <td>0</td>\n " +
            "  <td>-</td>\n " +
            "  <td>-</td>\n " +
            "  <td>"+ gameWinners[0]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
             " <td><a href=\"MVPGame/Crazy8_2.html?seed=0xe03d8ca4&game=1\">2</a></td>\n " +
             " <td>4</td>\n " +
             " <td>50</td>\n " +
              "<td>14</td>\n " +
             " <td>"+ gameWinners[1]+"</td>\n " +
            "</tr>\n " +
           " <tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x500aee51&game=2\">3</a></td>\n " +
              "<td>8</td>\n " +
              "<td>25</td>\n " +
              "<td>9</td>\n " +
              "<td>"+ gameWinners[2]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x8752f900&game=3\">4</a></td>\n " +
              "<td>4</td>\n " +
             " <td>75</td>\n " +
            "  <td>12</td>\n " +
            "  <td>"+ gameWinners[3]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0xbb905669&game=4\">5</a></td>\n " +
              "<td>4</td>\n " +
             " <td>50</td>\n " +
             " <td>14</td>\n " +
           "   <td>"+ gameWinners[4]+"</td>\n " +
          " </tr>\n " +
         " </tbody>\n " +
        "</table>\n " +
        "</body>\n " +
        "</html>";

      }
     }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
      String signIn = request.getParameter("signIn");
      String welcome = "";//generate this string based on whether they won or lost
      String result = request.getParameter("result");
      PrintWriter servletOut = response.getWriter();
      servletOut.println(signIn);
      HttpSession session = request.getSession();
      if(signIn!=null) {
        session.setAttribute("signIn", signIn);
        response.sendRedirect("GameSelect.html?signIn="+signIn);
      }

      String gameSelect = "<!DOCTYPE html>\n " +
        "<html>\n " +
        "<head>\n " +
         " <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">\n " +
         " <title>Select a Game</title>\n " +
         " </script>\n " +
         " <style type=\"text/css\">\n " +
         "   col { width:20%; }\n " +
         "   td,th  { text-align: center; }\n " +
         "   table, td, th { border: 1px solid gray }\n " +
         " </style>\n " +
         "   <link rel=\"stylesheet\" href=\"MVPGame/style2.css\" type=\"text/css\">\n " +
         " <meta name=\"generator\" content=\"Amaya, see http://www.w3.org/Amaya/\">\n " +
        "</head>\n " +
        "<body>\n " +
        "<h1><span id=\"title\">Crazy Eights</span></h1>\n " +
        "<h1>"+welcome+"</h1>\n " +
        "<table>\n " +
          "<caption\n " +
          "style=\"border:dashed; border-color:blue; padding:5px; margin:5px;\">Choose\n " +
          "from any of the hands below to play Crazy Eights and possibly get your name\n " +
          "on the board!</caption>\n " +
          "<colgroup><col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "  <col>\n " +
          "</colgroup>\n " +
          "<tbody>\n " +
            "<tr>\n " +
            "  <th>Hand</th>\n " +
            "  <th>Players</th>\n " +
            "  <th>% Players<br>\n " +
            "    winning</th>\n " +
             " <th>Fewest cards<br>\n " +
             "   played in win</th>\n " +
             " <th>Player playing<br>\n " +
            "    fewest cards</th>\n " +
            "</tr>\n " +
            "<tr>\n " +
            "  <td><a href=\"MVPGame/Crazy8_2.html?seed=0x6904acd2\">1</a></td>\n " +
            "  <td>0</td>\n " +
            "  <td>-</td>\n " +
            "  <td>-</td>\n " +
            "  <td>-</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
             " <td><a href=\"MVPGame/Crazy8_2.html?seed=0xe03d8ca4&game=1\">2</a></td>\n " +
             " <td>4</td>\n " +
             " <td>50</td>\n " +
              "<td>14</td>\n " +
             " <td>Sam</td>\n " +
            "</tr>\n " +
           " <tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x500aee51&game=2\">3</a></td>\n " +
              "<td>8</td>\n " +
              "<td>25</td>\n " +
              "<td>9</td>\n " +
              "<td>Kim</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x8752f900&game=3\">4</a></td>\n " +
              "<td>4</td>\n " +
             " <td>75</td>\n " +
            "  <td>12</td>\n " +
            "  <td>Dana</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0xbb905669&game=4\">5</a></td>\n " +
              "<td>4</td>\n " +
             " <td>50</td>\n " +
             " <td>14</td>\n " +
           "   <td>Taylor</td>\n " +
          " </tr>\n " +
         " </tbody>\n " +
        "</table>\n " +
        "</body>\n " +
        "</html>";
    }
}
