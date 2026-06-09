from abc import ABC, abstractmethod
import json
import os
import smtplib
from email.mime.text import MIMEText


class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount: float):
        pass


class CreditCardPayment(PaymentMethod):
    def pay(self, amount: float):
        print(f"Paid ₹{amount} using Credit Card")


class UPIPayment(PaymentMethod):
    def pay(self, amount: float):
        print(f"Paid ₹{amount} using UPI")


class WalletPayment(PaymentMethod):
    def pay(self, amount: float):
        print(f"Paid ₹{amount} using Wallet")


class NotificationService(ABC):
    @abstractmethod
    def send(self, message: str):
        pass


class EmailNotification(NotificationService):
    def send(self, message: str):
        sender = "your_email@gmail.com"
        password = "your_app_password"   # Use Gmail App Password
        receiver = "receiver@gmail.com"

        try:
            msg = MIMEText(message)
            msg["Subject"] = "Order Confirmation"
            msg["From"] = sender
            msg["To"] = receiver

            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(sender, password)
                server.send_message(msg)

            print("Email sent successfully")

        except Exception as e:
            print("Email failed:", e)
            print("Fallback: Notification not sent")


class SMSNotification(NotificationService):
    def send(self, message: str):
        print("SMS feature requires API setup (Twilio)")


class PushNotification(NotificationService):
    def send(self, message: str):
        print("Push notification requires app setup")


class OrderRepository(ABC):
    @abstractmethod
    def save(self, order):
        pass


class JSONFileRepository(OrderRepository):
    def __init__(self, filename="orders.json"):
        self.filename = filename

    def save(self, order):
        data = []

        if os.path.exists(self.filename):
            try:
                with open(self.filename, "r") as f:
                    data = json.load(f)
            except:
                data = []

        order_data = {
            "order_id": order.order_id,
            "amount": order.amount,
            "final_amount": order.get_final_amount(),
            "type": order.__class__.__name__
        }

        data.append(order_data)

        with open(self.filename, "w") as f:
            json.dump(data, f, indent=4)

        print(f"Order {order.order_id} saved to JSON file")


class Order(ABC):
    def __init__(self, order_id: int, amount: float):
        self.order_id = order_id
        self.amount = amount

    @abstractmethod
    def get_final_amount(self) -> float:
        pass


class RegularOrder(Order):
    def get_final_amount(self) -> float:
        return self.amount


class DiscountedOrder(Order):
    def __init__(self, order_id: int, amount: float, discount: float):
        super().__init__(order_id, amount)
        self.discount = discount

    def get_final_amount(self) -> float:
        return self.amount - self.discount


class PriorityOrder(Order):
    def get_final_amount(self) -> float:
        return self.amount + 50


class OrderService:
    def __init__(self, payment: PaymentMethod,
                 notifier: NotificationService,
                 repository: OrderRepository):
        self.payment = payment
        self.notifier = notifier
        self.repository = repository

    def place_order(self, order: Order):
        final_amount = order.get_final_amount()
        self.payment.pay(final_amount)
        self.repository.save(order)
        self.notifier.send(
            f"Order {order.order_id} placed successfully! Amount: ₹{final_amount}"
        )


if __name__ == "__main__":

    order_id = int(input("Enter Order ID: "))
    amount = float(input("Enter Amount: "))

    print("\nSelect Order Type:")
    print("1. Regular")
    print("2. Discounted")
    print("3. Priority")
    order_type = int(input("Choice: "))

    if order_type == 2:
        discount = float(input("Enter Discount: "))
        order = DiscountedOrder(order_id, amount, discount)
    elif order_type == 3:
        order = PriorityOrder(order_id, amount)
    else:
        order = RegularOrder(order_id, amount)

    print("\nSelect Payment Method:")
    print("1. Credit Card")
    print("2. UPI")
    print("3. Wallet")
    p = int(input("Choice: "))

    if p == 1:
        payment = CreditCardPayment()
    elif p == 2:
        payment = UPIPayment()
    else:
        payment = WalletPayment()

    print("\nSelect Notification Type:")
    print("1. Email")
    print("2. SMS")
    print("3. Push")
    n = int(input("Choice: "))

    if n == 1:
        notifier = EmailNotification()
    elif n == 2:
        notifier = SMSNotification()
    else:
        notifier = PushNotification()

    repository = JSONFileRepository()

    service = OrderService(payment, notifier, repository)
    service.place_order(order)