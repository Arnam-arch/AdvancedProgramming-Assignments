from abc import ABC, abstractmethod


class LibraryItem(ABC):
    item_count = 0

    def __init__(self, title, year):
        self.title = title
        self.year = year
        LibraryItem.item_count += 1

    @abstractmethod
    def displayInfo(self):
        pass


class Book(LibraryItem):
    def __init__(self, title, year, author="Unknown"):
        super().__init__(title, year)
        self.author = author

    def displayInfo(self):
        print(f"Book: {self.title}, Year: {self.year}, Author: {self.author}")


class DVD(LibraryItem):
    def __init__(self, title, year, duration=0, genre="Unknown"):
        super().__init__(title, year)
        self.duration = duration
        self.genre = genre

    def displayInfo(self):
        print(f"DVD: {self.title}, Year: {self.year}, Duration: {self.duration} mins, Genre: {self.genre}")


if __name__ == "__main__":
    items = [
        Book("The Alchemist", 1988, "Paulo Coelho"),
        DVD("Inception", 2010, 148, "Sci-Fi"),
        Book("Atomic Habits", 2018),
        DVD("Interstellar", 2014)
    ]

    for item in items:
        item.displayInfo()

    print(f"\nTotal Library Items: {LibraryItem.item_count}")