# Testing Exercise — Add to bag (25 minutes)

## The situation

The team finished ticket **BAG-118** below and wants to release it tomorrow. You are the quality engineer for this feature. Test it as you would test a mobile app, report what you find, and give your opinion on the release.

The page opens on the right. You may use any tool your browser offers, and your usual AI assistant if you work with one. If you use one, please tell us what you ask it and how you check what it gives you.

Think out loud as you work. We are interested in how you decide what to test, not only in what you find.

## Ticket BAG-118 — Add to bag and bag summary

**Acceptance criteria**

1. A customer must select a size before adding the product to the bag. Sizes that are sold out cannot be selected.
2. The bag icon shows the number of items in the bag.
3. When the customer changes the quantity, the line total and the order total update immediately.
4. The promo code SAVE10 takes 10 % off the subtotal. An invalid code shows an error message.
5. Every control can be used with a screen reader, with a name that says what it does.
6. On small phones (320 px wide), the layout works and the Checkout button stays visible.

## Steps

1. **Explore (12 minutes).** Test the feature against the ticket. Tell us what you test and why.
2. **Report (8 minutes).** Write the two most important problems you found, using the template below. Paste them in the interview chat or in a file.
3. **Decide (5 minutes).** Would you release this tomorrow? Explain why, and say what you would test or automate next.

## Defect report template

```
Title:
Steps to reproduce:
Expected result:
Actual result:
Environment (device, screen size, browser):
Severity (and why):
Evidence (screenshot, notes):
```

## Rules

- Do not change the code; this exercise is about testing, not fixing.
- Base your findings on the ticket. If the ticket leaves something unclear, say what you would ask the product team.
- If you use an AI assistant, check everything it suggests before you use it.
