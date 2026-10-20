import { useState } from "react";

type Size = { label: string; soldOut: boolean };

const PRODUCT = {
  name: "Runner One",
  description: "Lightweight running shoe with a breathable mesh upper and a cushioned sole for everyday miles.",
  price: 120,
  sizes: [
    { label: "7", soldOut: false },
    { label: "8", soldOut: false },
    { label: "9", soldOut: false },
    { label: "10", soldOut: false },
    { label: "11", soldOut: true },
    { label: "12", soldOut: false },
  ] as Size[],
};

const PROMO_CODES: Record<string, number> = { SAVE10: 0.1 };

type BagLine = { size: string; quantity: number };

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function App() {
  const [size, setSize] = useState<string | null>(null);
  const [bag, setBag] = useState<BagLine[]>([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [codeMessage, setCodeMessage] = useState("");

  const itemCount = bag.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = bag.reduce((sum, line) => sum + line.quantity * PRODUCT.price, 0);
  const total = subtotal - discount;

  function addToBag() {
    if (!size) return;
    setBag((lines) => {
      const existing = lines.find((line) => line.size === size);
      if (existing) {
        return lines.map((line) => (line.size === size ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...lines, { size, quantity: 1 }];
    });
  }

  function changeQuantity(lineSize: string, delta: number) {
    setBag((lines) =>
      lines
        .map((line) => (line.size === lineSize ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0)
    );
  }

  function applyCode() {
    const rate = PROMO_CODES[code.trim()];
    if (rate === undefined) {
      setDiscount(0);
      setCodeMessage("This code is not valid.");
      return;
    }
    setDiscount(subtotal * rate);
    setCodeMessage(`Code ${code.trim()} applied.`);
  }

  return (
    <div className="page">
      <header className="topbar">
        <span className="brand">Runner One Store</span>
        <span className="bag-icon" aria-label={`Bag, ${itemCount} items`}>
          Bag <span className="badge">{itemCount}</span>
        </span>
      </header>

      <main>
        <div className="product-image" role="img" aria-label="Runner One running shoe, side view" />
        <h1>{PRODUCT.name}</h1>
        <p className="price">{money(PRODUCT.price)}</p>
        <p className="description">{PRODUCT.description}</p>

        <h2>Select a size</h2>
        <div className="sizes">
          {PRODUCT.sizes.map((s) => (
            <button
              key={s.label}
              className={`size ${size === s.label ? "selected" : ""} ${s.soldOut ? "sold-out" : ""}`}
              aria-pressed={size === s.label}
              onClick={() => setSize(s.label)}
            >
              US {s.label}
              {s.soldOut && <small>Sold out</small>}
            </button>
          ))}
        </div>

        <button className="primary" disabled={!size} onClick={addToBag}>
          Add to bag
        </button>

        <section className="bag">
          <h2>Your bag</h2>
          {bag.length === 0 && <p>Your bag is empty.</p>}
          {bag.map((line) => (
            <div className="line" key={line.size}>
              <div>
                <strong>{PRODUCT.name}</strong>
                <div className="muted">Size US {line.size}</div>
              </div>
              <div className="qty">
                <button className="icon" onClick={() => changeQuantity(line.size, -1)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <span>{line.quantity}</span>
                <button className="icon" onClick={() => changeQuantity(line.size, 1)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <div className="line-total">{money(line.quantity * PRODUCT.price)}</div>
            </div>
          ))}

          {bag.length > 0 && (
            <>
              <div className="promo">
                <label htmlFor="promo-code">Promo code</label>
                <div className="promo-row">
                  <input id="promo-code" value={code} onChange={(e) => setCode(e.target.value)} />
                  <button onClick={applyCode}>Apply</button>
                </div>
                {codeMessage && <p className="muted">{codeMessage}</p>}
              </div>
              <dl className="summary">
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
                <dt>Discount</dt>
                <dd>-{money(discount)}</dd>
                <dt>Total</dt>
                <dd className="total">{money(total)}</dd>
              </dl>
              <button className="primary checkout">Checkout</button>
            </>
          )}
        </section>
      </main>

      <footer className="sticky">
        <span>Free shipping on orders over $150</span>
        <span>Free returns within 30 days</span>
      </footer>
    </div>
  );
}
