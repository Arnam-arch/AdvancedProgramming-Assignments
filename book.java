import java.util.ArrayList;
import java.util.Scanner;

public class book {

    public static void main(String[] args) {

        ArrayList<String> books = new ArrayList<>();

        books.add("The Alchemist");
        books.add("Atomic Habits");
        books.add("Rich Dad Poor Dad");
        books.add("The Power of Habit");
        books.add("Think and Grow Rich");

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter word to search: ");
        String word = sc.nextLine().toLowerCase();

        System.out.println("\nBooks containing \"" + word + "\":");

        boolean found = false;

        for (String book : books) {
            if (book.toLowerCase().contains(word)) {
                System.out.println(book);
                found = true;
            }
        }

        if (!found) {
            System.out.println("No matching books found.");
        }

        sc.close();
    }
}
