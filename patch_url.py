import os

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

replacement = """  // Deep link support (Shareable URL)
  useEffect(() => {
    const parseUrlProduct = () => {
      try {
        const path = window.location.pathname;
        if (path && path.endsWith('.html')) {
          const slug = path.substring(1, path.length - 5);
          if (products && products.length > 0) {
            const found = products.find(p => generateSlug(p.name) === slug);
            if (found) {
              setSelectedProduct(found);
              setCurrentView('PRODUCTS');
              return;
            }
          }
        }
        
        const params = new URLSearchParams(window.location.search);
        const target = params.get('p') || params.get('product') || params.get('sp') || params.get('id') || params.get('code');
        
        if (target && products && products.length > 0) {
          const cleanTarget = target.trim().toLowerCase();
          const found = products.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget ||
            p.name.toLowerCase().includes(cleanTarget)
          );

          if (found) {
            setSelectedProduct(found);
            setCurrentView('PRODUCTS');
          }
        }
      } catch (err) {
        console.warn('Error reading URL params for product deep link:', err);
      }
    };

    if (products.length > 0) {
      parseUrlProduct();
    }

    const handlePopState = () => {
      if (products.length > 0) {
        parseUrlProduct();
      }
    };"""

content = content.replace("""  // Deep link support (Shareable URL)
  useEffect(() => {
    const parseUrlProduct = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('p') || params.get('product') || params.get('sp') || params.get('id') || params.get('code');
        
        if (target) {
          const cleanTarget = target.trim().toLowerCase();
          const found = products.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget ||
            p.name.toLowerCase().includes(cleanTarget)
          );

          if (found) {
            setSelectedProduct(found);
            setCurrentView('PRODUCTS');
          }
        }
      } catch (err) {
        console.warn('Error reading URL params for product deep link:', err);
      }
    };

    parseUrlProduct();

    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('p') || params.get('product') || params.get('sp') || params.get('id') || params.get('code');
        
        if (target) {
          const cleanTarget = target.trim().toLowerCase();
          const found = products.find(p => 
            p.code.toLowerCase() === cleanTarget ||
            p.id.toString() === cleanTarget ||
            p.code.toLowerCase().replace('tec-', '') === cleanTarget
          );
          setSelectedProduct(found || null);
        } else {
          setSelectedProduct(null);
        }
      } catch (e) {}
    };""", replacement)

with open(filepath, 'w') as f:
    f.write(content)
