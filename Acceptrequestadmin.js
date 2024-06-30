<%@ page import="java.sql.*" %>
<%@ page import="java.io.StringWriter, java.io.PrintWriter" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accept Request</title>
</head>
<body>
<%
    String bookID = request.getParameter("BookID");
    out.println("Received BookID: " + bookID + "<br>");
    if (bookID != null && !bookID.isEmpty()) {
        Connection con = null;
        PreparedStatement stmt = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/adminlogin", "root", "your_paassword");
            String sql = "UPDATE requestedbooks SET status = 'accepted' WHERE BookID = ?";
            stmt = con.prepareStatement(sql);
            stmt.setInt(1, Integer.parseInt(bookID));
            int rowsUpdated = stmt.executeUpdate();
            out.println("Rows updated: " + rowsUpdated + "<br>");
            if (rowsUpdated > 0) {
                out.println("<script>alert('Request accepted successfully'); window.location.href='AdminDashboard.jsp';</script>");
            } else {
                out.println("<script>alert('No request found with the provided Book ID'); window.location.href='AdminDashboard.jsp';</script>");
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            out.println("<script>alert('Error: " + sw.toString() + "');</script>");
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (con != null) con.close();
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                out.println("<script>alert('Error closing resources: " + sw.toString() + "');</script>");
            }
        }
    } else {
        out.println("<script>alert('Invalid book ID'); window.location.href='admin.jsp';</script>");
    }
%>
</body>
</html>