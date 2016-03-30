import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.regex.*;
import java.util.Enumeration;

/**
 *
 */
@WebServlet( urlPatterns={"/CrazyServlet"} )
public class CrazyServlet extends HttpServlet {
  private static final long serialVersionUID = 1;
/**
 * to do:
 *
 *  -concurrencY
 *  -only updating statistics for unique players
 *  -url rewriting (how to we verify that it is correct?)
 *  -similarly, if the user wins on a deck and later loses, the “% Players winning” value should be unchanged by the loss, since the player has been—and should continue to be—counted as a winning player.
 */
    String[] highlight = {"#eee", "#eee", "#eee", "#eee", "#eee"};

    private void printEnd(PrintWriter servletOut)
    {
          servletOut.println(
            "  </body> \n" +
            "</html> ");
    }
    private void printStart(PrintWriter servletOut) {
      servletOut.println("<!DOCTYPE html>\n " +
        "<html>\n ");

    }

    private void printTable(PrintWriter servletOut, HttpServletResponse response) {
       String table = "<table>\n " +
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
            "  <td><a href=" + response.encodeURL("\"MVPGame/Crazy8_2.html?seed=0x6904acd2&game=1\"")+">1</a></td>\n " +
            "  <td>" + ConcurrentAccess.numPlayers[0] + "</td>\n " +
            "  <td>" + ConcurrentAccess.percentPlayersWinning[0] + "</td>\n " +
            "  <td>" + ConcurrentAccess.fewestCards[0] + "</td>\n " +
            "  <td bgcolor=" + highlight[4] + ">" + ConcurrentAccess.winner[0] + "</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
             " <td><a href=" + response.encodeURL("\"MVPGame/Crazy8_2.html?seed=0xe03d8ca4&game=2\"")+">2</a></td>\n " +
             " <td>" + ConcurrentAccess.numPlayers[1] + "</td>\n " +
             " <td>" + ConcurrentAccess.percentPlayersWinning[1] + "</td>\n " +
              "<td>" + ConcurrentAccess.fewestCards[1]+"</td>\n " +
             " <td bgcolor=" + highlight[4]+">"+ ConcurrentAccess.winner[1] + "</td>\n " +
            "</tr>\n " +
           " <tr>\n " +
              "<td><a href=" + response.encodeURL("\"MVPGame/Crazy8_2.html?seed=0x500aee51&game=3\"")+">3</a></td>\n " +
              "<td>"+ ConcurrentAccess.numPlayers[2] + "</td>\n " +
              "<td>"+ ConcurrentAccess.percentPlayersWinning[2] + "</td>\n " +
              "<td>"+ ConcurrentAccess.fewestCards[2] + "</td>\n " +
              "<td bgcolor=" + highlight[4] + ">" + ConcurrentAccess.winner[2] + "</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=" + response.encodeURL("\"MVPGame/Crazy8_2.html?seed=0x8752f900&game=4\"") + ">4</a></td>\n " +
              "<td>"+ ConcurrentAccess.numPlayers[3] + "</td>\n " +
             " <td>"+ ConcurrentAccess.percentPlayersWinning[3] + "</td>\n " +
            "  <td>"+ ConcurrentAccess.fewestCards[3] + "</td>\n " +
            "<td bgcolor=" + highlight[4]+">"+ ConcurrentAccess.winner[3] + "</td>\n " +
            "</tr>\n " +
            "<tr>\n " +
              "<td><a href=" + response.encodeURL("\"MVPGame/Crazy8_2.html?seed=0xbb905669&game=5\"") + ">5</a></td>\n " +
              "<td>"+ ConcurrentAccess.numPlayers[4] + "</td>\n " +
             " <td>"+ ConcurrentAccess.percentPlayersWinning[4]+"</td>\n " +
             " <td>"+ ConcurrentAccess.fewestCards[4]+"</td>\n " +
           "   <td bgcolor=" + highlight[4] + ">"+ ConcurrentAccess.winner[4] + "</td>\n " +
          " </tr>\n " +
         " </tbody>\n ";
         servletOut.println(table);

    }

    private void printHead(PrintWriter servletOut){
      String head =
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
        "<body>\n ";
        servletOut.println(head);
    }

    private void printTitle(PrintWriter servletOut, String signIn) {
      String title=  "<h1><span id=\"title\">Crazy Eights</span></h1>\n " +
        "<h1>Welcome, " + WebTechUtil.escapeXML(signIn) + "!</h1>\n ";
        servletOut.println(title);
    }


    public void doGet (HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException
      {
      int gameNumber;
      response.setHeader("Cache-Control", "no-cache");
      response.setContentType("text/html; charset=\"UTF-8\"");
      PrintWriter servletOut = response.getWriter();
      HttpSession session = request.getSession();
      request.getQueryString(); //what is this for?
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
          String signIn = WebTechUtil.escapeXML(session.getAttribute("signIn").toString());
          String welcome = "Welcome, " + signIn + "!"; //generate this string based on whether they won or lost
          if(request.getParameter("result")!=null) {
            String result = request.getParameter("result");
            gameNumber = Integer.parseInt(request.getParameter("game"));
            int cardsPlayed = Integer.parseInt(request.getParameter("cardsPlayed"));
            ConcurrentAccess.changeNumPlayers(gameNumber-1); //concurrent access
            if(result.equals("won")) {
              ConcurrentAccess.changeNumWinners(gameNumber-1);
              highlight[gameNumber-1] = "pink";
              if(ConcurrentAccess.fewestCards[gameNumber-1] >= cardsPlayed) {
                ConcurrentAccess.changeWinner(gameNumber-1, signIn);
                ConcurrentAccess.changeFewestCards(gameNumber-1, cardsPlayed);
                ConcurrentAccess.changePercentPlayersWinning(gameNumber-1);
              }
              welcome = "Congratulations, " + signIn + "! Play again?";
            } else {
              ConcurrentAccess.changePercentPlayersWinning(gameNumber-1);
              welcome = "Sorry, " + signIn + ", better luck next time!";
            }
          }
          session.setAttribute("signIn", signIn);
          printStart(servletOut);
          printHead(servletOut);
          printTitle(servletOut, signIn);
          printTable(servletOut, response);
          printEnd(servletOut);
          servletOut.close();
          highlight[0] = "#eee"; //reset the highlighting for next time
          highlight[1] = "#eee"; //reset the highlighting for next time
          highlight[2] = "#eee"; //reset the highlighting for next time
          highlight[3] = "#eee"; //reset the highlighting for next time
          highlight[4] = "#eee"; //reset the highlighting for next time

      }
     }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
      request.getQueryString();
      String signIn = WebTechUtil.escapeXML(request.getParameter("signIn"));
      // String welcome = "Welcome, " + WsignIn + "!"; //generate this string based on whether they won or lost
      String result = request.getParameter("result");
      response.setHeader("Cache-Control", "no-cache");
      response.setContentType("text/html; charset=\"UTF-8\"");
      PrintWriter servletOut = response.getWriter();
      HttpSession session = request.getSession();
      if(signIn!=null) {
        session.setAttribute("signIn", signIn);
        printStart(servletOut);
        printHead(servletOut);
        printTitle(servletOut, signIn);
        printTable(servletOut, response);
        printEnd(servletOut);
        servletOut.close();

      }
    }
}

/**
 * Utilities to support examples in "Web Technologies" textbook
 */
class WebTechUtil {

    /**
     * Ampersand pattern used by escapeXML
     */
    static private Pattern pAmp = Pattern.compile("&");
    /**
     * Less-than pattern used by escapeXML
     */
    static private Pattern pLT =  Pattern.compile("<");
    /**
     * Greater-than pattern used by escapeXML
     */
    static private Pattern pGT =  Pattern.compile(">");
    /**
     * Double-quote pattern used by escapeQuotes
     */
    static private Pattern pDQ = Pattern.compile("\"");
    /**
     * Single-quote pattern used by escapeQuotes
     */
    static private Pattern pSQ = Pattern.compile("'");


    /**
     * Return input string with ampersands (&),
     * less-than signs (<), and greater-than signs (>)
     * replaced with character entity references.
     */
    static public String escapeXML(String inString)
    {
        Matcher matcher = pAmp.matcher(inString);
        String modified = matcher.replaceAll("&amp;");
        matcher = pLT.matcher(modified);
        modified = matcher.replaceAll("&lt;");
        matcher = pGT.matcher(modified);
        modified = matcher.replaceAll("&gt;");
        return modified;
    }

    /**
     * Return input string with all quotes replaced
     * with references.  Use character reference for single quotes
     * because IE6 does not support &apos; entity reference.
     */
    static public String escapeQuotes(String inString)
    {
	Matcher matcher = pDQ.matcher(inString);
	String modified = matcher.replaceAll("&quot;");
	matcher = pSQ.matcher(modified);
	modified = matcher.replaceAll("&#39;");
	return modified;
    }
}

class ConcurrentAccess {
  public static String[] winner = {"-","-","-","-","-"}; //entry 1 corresponds with winner of hand 1, etc.
  public static int[] fewestCards = {Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE};
  public static int[] numPlayers = {0,0,0,0,0};
  public static double[] percentPlayersWinning = {0,0,0,0,0};
  public static int[] numWinners = {0,0,0,0,0};

  public synchronized static void changeWinner(int gameNumber, String signIn) {
    winner[gameNumber] = signIn;
  }

  public synchronized static void changeFewestCards(int gameNumber, int cardsPlayed) {
    fewestCards[gameNumber] = cardsPlayed;
  }

  public synchronized static void changeNumPlayers(int gameNumber) { //+1
    numPlayers[gameNumber]++;
  }

  public synchronized static void changePercentPlayersWinning(int gameNumber) {
    percentPlayersWinning[gameNumber] = ((double)numWinners[gameNumber]/(double)numPlayers[gameNumber])*100; //not sure if this is right

  }

  public synchronized static void changeNumWinners(int gameNumber) { //+1
    numWinners[gameNumber]++;
  }
}