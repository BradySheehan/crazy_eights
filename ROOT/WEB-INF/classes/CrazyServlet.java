import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;

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
     * need data structures for each of the statistics? (I feel like we don't need to remember much)
     */
    String[] winner = {"-","-","-","-","-"}; //entry 1 corresponds with winner of hand 1, etc.
    int[] fewestCards = {Integer.MAX_VALUE,Integer.MAX_VALUE,Integer.MAX_VALUE,Integer.MAX_VALUE,Integer.MAX_VALUE};
    int[] numPlayers = {0,0,0,0,0};
    int[] percentPlayersWining = {0,0,0,0,0};

    private void printEnd(PrintWriter servletOut)
    {
          servletOut.println(
"  </body> \n" +
"</html> ");
    }
    public void doGet (HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException
      {
      response.setHeader("Cache-Control", "no-cache");
      response.setContentType("text/html; charset=\"UTF-8\"");
      PrintWriter servletOut = response.getWriter();
      HttpSession session = request.getSession();
      request.getQueryString();
      //i didn't know this. and I thought it was related to the error, but in case you don't know this
      //i am adding it here:
      //"getSession() returns the valid session object associated with the request,
      //identified in the session cookie that is encapsulated in the request object.
      //Calling the method with no arguments creates a session if one does not exist
      //that is associated with the request."
      if(session.isNew()) {
          servletOut.println(
            "<!DOCTYPE html> \n " +
             "<html xmlns='http://www.w3.org/1999/xhtml'> \n" +
             " <head> \n "+
               " <title> \n"+
                  "Crazy Eights Sign-in!\n"+
                "</title>\n"+
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
          String welcome = "Welcome, " + signIn + "!";//generate this string based on whether they won or lost
          String query = request.getQueryString();
          if(query.contains("result")) {
            String result = request.getParameter("result");
            int gameNumber = Integer.parseInt(request.getParameter("game"));
            int cardsPlayed = Integer.parseInt(request.getParameter("cardsPlayed"));
            numPlayers[gameNumber-1]++;
            if(result.equals("won")) {
              if(fewestCards[gameNumber-1] >= cardsPlayed) {
                winner[gameNumber-1] = signIn;
                fewestCards[gameNumber-1] = cardsPlayed;
                numPlayers[gameNumber-1]++;
                percentPlayersWining[gameNumber-1] = ((percentPlayersWining[gameNumber-1]+1)/numPlayers[gameNumber-1]); //not sure if this is right
              }
              welcome = "Congratularions, " + signIn + "! Play again?";
            } else {
              numPlayers[gameNumber-1]++;
              percentPlayersWining[gameNumber-1] = ((percentPlayersWining[gameNumber-1])/numPlayers[gameNumber-1]); //not sure if this is right
              welcome = "Sorry, " + signIn + ", better luck next time!";
            }
          }
          String head ="<html>\n " +
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
          "</head>\n ";
        String body = "<!DOCTYPE html>\n " +
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
            "  <td>"+numPlayers[0]+"</td>\n " +
            "  <td>"+percentPlayersWining[0]+"</td>\n " +
            "  <td>"+fewestCards[0]+"</td>\n " +
            "  <td>"+winner[0]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
             " <td><a href=\"MVPGame/Crazy8_2.html?seed=0xe03d8ca4&game=1\">2</a></td>\n " +
             " <td>"+numPlayers[1]+"</td>\n " +
             " <td>"+percentPlayersWining[1]+"</td>\n " +
              "<td>"+fewestCards[1]+"</td>\n " +
             " <td>"+winner[1]+"</td>\n " +
            "</tr>\n " +
           " <tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x500aee51&game=2\">3</a></td>\n " +
              "<td>"+numPlayers[2]+"</td>\n " +
              "<td>"+percentPlayersWining[2]+"</td>\n " +
              "<td>"+fewestCards[2]+"</td>\n " +
              "<td>"+winner[2]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x8752f900&game=3\">4</a></td>\n " +
              "<td>"+numPlayers[3]+"</td>\n " +
             " <td>"+percentPlayersWining[3]+"</td>\n " +
            "  <td>"+fewestCards[3]+"</td>\n " +
            "  <td>"+winner[3]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0xbb905669&game=4\">5</a></td>\n " +
              "<td>"+numPlayers[4]+"</td>\n " +
             " <td>"+percentPlayersWining[4]+"</td>\n " +
             " <td>"+fewestCards[4]+"</td>\n " +
           "   <td>"+winner[4]+"</td>\n " +
          " </tr>\n " +
         " </tbody>\n " +
        "</table>\n " +
        "</body>\n " +
        "</html>";
        servletOut.println(head+body);
        servletOut.close();
      }
     }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
      request.getQueryString();
      String signIn = request.getParameter("signIn");
      String welcome = "Welcome, "+signIn + "!";//generate this string based on whether they won or lost
      String result = request.getParameter("result");
      response.setHeader("Cache-Control", "no-cache");
      response.setContentType("text/html; charset=\"UTF-8\"");
      PrintWriter servletOut = response.getWriter();
      HttpSession session = request.getSession();
      if(signIn!=null) {
        session.setAttribute("signIn", signIn);

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
            "  <td>"+numPlayers[0]+"</td>\n " +
            "  <td>"+percentPlayersWining[0]+"</td>\n " +
            "  <td>"+fewestCards[0]+"</td>\n " +
            "  <td>"+winner[0]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
             " <td><a href=\"MVPGame/Crazy8_2.html?seed=0xe03d8ca4&game=1\">2</a></td>\n " +
             " <td>"+numPlayers[1]+"</td>\n " +
             " <td>"+percentPlayersWining[1]+"</td>\n " +
              "<td>"+fewestCards[1]+"</td>\n " +
             " <td>"+winner[1]+"</td>\n " +
            "</tr>\n " +
           " <tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x500aee51&game=2\">3</a></td>\n " +
              "<td>"+numPlayers[2]+"</td>\n " +
              "<td>"+percentPlayersWining[2]+"</td>\n " +
              "<td>"+fewestCards[2]+"</td>\n " +
              "<td>"+winner[2]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0x8752f900&game=3\">4</a></td>\n " +
              "<td>"+numPlayers[3]+"</td>\n " +
             " <td>"+percentPlayersWining[3]+"</td>\n " +
            "  <td>"+fewestCards[3]+"</td>\n " +
            "  <td>"+winner[3]+"</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=\"MVPGame/Crazy8_2.html?seed=0xbb905669&game=4\">5</a></td>\n " +
              "<td>"+numPlayers[4]+"</td>\n " +
             " <td>"+percentPlayersWining[4]+"</td>\n " +
             " <td>"+fewestCards[4]+"</td>\n " +
           "   <td>"+winner[4]+"</td>\n " +
          " </tr>\n " +
         " </tbody>\n " +
        "</table>\n " +
        "</body>\n " +
        "</html>";
        servletOut.println(gameSelect);
        servletOut.close();

      }
    }
}
