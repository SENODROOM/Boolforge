import React, { useState, useRef, useEffect, useCallback } from 'react';

const Boolforge = () => {
  const [gates, setGates] = useState([]);
  const [wires, setWires] = useState([]);
  const [selectedGate, setSelectedGate] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [gateIdCounter, setGateIdCounter] = useState(0);
  const [wireIdCounter, setWireIdCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const GRID_SIZE = 20;
  const SNAP_TO_GRID = true;

  // Gate symbols as SVG components
  const gateSymbols = {
    'AND': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 10 L 10 50 L 40 50 Q 65 50 65 30 Q 65 10 40 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'OR': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 40 30 Q 60 30 65 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'NOT': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 15 L 10 45 L 55 30 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="60" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'NAND': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 10 L 10 50 L 40 50 Q 60 50 60 30 Q 60 10 40 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'NOR': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 40 30 Q 55 30 60 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'XOR': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 5 10 Q 15 30 5 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 40 30 Q 60 30 65 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'XNOR': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 5 10 Q 15 30 5 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 10 10 Q 25 10 40 30 Q 25 50 10 50 Q 20 30 10 10 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 40 30 Q 55 30 60 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="65" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'BUFFER': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <path d="M 10 15 L 10 45 L 65 30 Z"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'INPUT': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <rect x="15" y="20" width="50" height="20" rx="3"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="65" y1="30" x2="78" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'OUTPUT': (
      <svg viewBox="0 0 80 60" className="gate-symbol">
        <rect x="15" y="20" width="50" height="20" rx="3"
          fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="2" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  };

  const snapToGrid = (value) => {
    return SNAP_TO_GRID ? Math.round(value / GRID_SIZE) * GRID_SIZE : value;
  };

  // Helper function to find gate by ID
  const findGateById = useCallback((id) => {
    return gates.find(g => g.id === id);
  }, [gates]);

  const evaluateGate = useCallback((gate) => {
    if (!gate) return false;
    
    if (gate.type === 'INPUT') {
      return gate.inputValues[0] || false;
    }

    const inputs = [];
    wires.forEach(wire => {
      if (wire.toId === gate.id) {
        const fromGate = findGateById(wire.fromId);
        if (fromGate) {
          const sourceOutput = evaluateGate(fromGate);
          inputs[wire.toIndex] = sourceOutput;
        }
      }
    });

    switch (gate.type) {
      case 'AND':
        return inputs.length === 2 && inputs[0] && inputs[1];
      case 'OR':
        return inputs.length === 2 && (inputs[0] || inputs[1]);
      case 'NOT':
        return !inputs[0];
      case 'NAND':
        return !(inputs.length === 2 && inputs[0] && inputs[1]);
      case 'NOR':
        return !(inputs.length === 2 && (inputs[0] || inputs[1]));
      case 'XOR':
        return inputs.length === 2 && (inputs[0] !== inputs[1]);
      case 'XNOR':
        return inputs.length === 2 && (inputs[0] === inputs[1]);
      case 'BUFFER':
        return inputs[0] || false;
      case 'OUTPUT':
        return inputs[0] || false;
      default:
        return false;
    }
  }, [wires, findGateById]);

  // Enhanced wire drawing with smooth bezier curves
  const drawWires = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wires.forEach(wire => {
      const fromGate = findGateById(wire.fromId);
      const toGate = findGateById(wire.toId);

      if (!fromGate || !toGate) return;

      // Calculate connection points
      const fromX = fromGate.x + 120;
      const fromY = fromGate.y + 50;
      
      const toInputCount = toGate.inputs;
      const toX = toGate.x;
      const toY = toGate.y + (toInputCount === 1 ? 50 : (wire.toIndex === 0 ? 35 : 65));

      const isActive = evaluateGate(fromGate);

      // Set wire appearance
      ctx.strokeStyle = isActive ? '#00ff88' : '#334155';
      ctx.lineWidth = 3;
      ctx.shadowBlur = isActive ? 12 : 0;
      ctx.shadowColor = isActive ? '#00ff88' : 'transparent';

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);

      // Calculate control points for smooth bezier curve
      const dx = toX - fromX;
      const dy = toY - fromY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Adaptive control point distance for more natural curves
      const controlDistance = Math.min(Math.abs(dx) / 2, distance / 3);
      
      // Create smooth S-curve
      ctx.bezierCurveTo(
        fromX + controlDistance, fromY,
        toX - controlDistance, toY,
        toX, toY
      );

      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }, [wires, findGateById, evaluateGate]);

  // Continuous rendering loop for smooth wire updates
  useEffect(() => {
    const animate = () => {
      drawWires();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawWires]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawWires();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [drawWires]);

  const saveToHistory = useCallback(() => {
    const state = {
      gates: JSON.parse(JSON.stringify(gates)),
      wires: JSON.parse(JSON.stringify(wires)),
      gateIdCounter,
      wireIdCounter
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(state);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [gates, wires, gateIdCounter, wireIdCounter, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setGates(JSON.parse(JSON.stringify(state.gates)));
      setWires(JSON.parse(JSON.stringify(state.wires)));
      setGateIdCounter(state.gateIdCounter);
      setWireIdCounter(state.wireIdCounter);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setGates(JSON.parse(JSON.stringify(state.gates)));
      setWires(JSON.parse(JSON.stringify(state.wires)));
      setGateIdCounter(state.gateIdCounter);
      setWireIdCounter(state.wireIdCounter);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
        e.preventDefault();
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedGate && !dragging) {
          deleteGate(selectedGate);
        }
      } else if (e.key === 'Escape') {
        setConnectingFrom(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGate, dragging, undo, redo]);

  const addGate = (type) => {
    const isInput = type === 'INPUT';
    const isOutput = type === 'OUTPUT';
    const isNot = type === 'NOT' || type === 'BUFFER';

    const newGate = {
      id: gateIdCounter,
      type: type,
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 300,
      inputs: isInput ? 0 : (isNot || isOutput ? 1 : 2),
      hasOutput: !isOutput,
      output: null,
      inputValues: isInput ? [false] : [],
      label: type === 'INPUT' ? `IN_${gateIdCounter}` :
        type === 'OUTPUT' ? `OUT_${gateIdCounter}` : null
    };

    setGates(prev => [...prev, newGate]);
    setGateIdCounter(prev => prev + 1);
    saveToHistory();
  };

  const startDrag = (e, gate) => {
    if (e.target.classList?.contains('connection-point')) return;

    setSelectedGate(gate);
    setDragging(true);
    setDragOffset({
      x: e.clientX - gate.x,
      y: e.clientY - gate.y
    });
  };

  const onDrag = (e) => {
    if (!dragging || !selectedGate) return;

    const newX = snapToGrid(e.clientX - dragOffset.x);
    const newY = snapToGrid(e.clientY - dragOffset.y);

    setGates(prev => prev.map(g =>
      g.id === selectedGate.id ? { ...g, x: newX, y: newY } : g
    ));
  };

  const stopDrag = () => {
    if (dragging) {
      saveToHistory();
    }
    setDragging(false);
    setSelectedGate(null);
  };

  const deleteGate = (gate) => {
    setGates(prev => prev.filter(g => g.id !== gate.id));
    setWires(prev => prev.filter(w => w.fromId !== gate.id && w.toId !== gate.id));
    setSelectedGate(null);
    saveToHistory();
  };

  const startConnection = (gate) => {
    if (gate.hasOutput) {
      setConnectingFrom(gate);
    }
  };

  const completeConnection = (toGate, toIndex) => {
    if (!connectingFrom || !toGate || connectingFrom.id === toGate.id) {
      setConnectingFrom(null);
      return;
    }

    const existingWire = wires.find(w =>
      w.toId === toGate.id && w.toIndex === toIndex
    );

    if (existingWire) {
      alert('This input is already connected');
      setConnectingFrom(null);
      return;
    }

    const newWire = {
      id: wireIdCounter,
      fromId: connectingFrom.id,
      toId: toGate.id,
      toIndex: toIndex
    };

    setWires(prev => [...prev, newWire]);
    setWireIdCounter(prev => prev + 1);
    setConnectingFrom(null);
    saveToHistory();
  };

  const deleteWire = (wireToDelete) => {
    setWires(prev => prev.filter(w => w.id !== wireToDelete.id));
    saveToHistory();
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const wire of wires) {
      const fromGate = findGateById(wire.fromId);
      const toGate = findGateById(wire.toId);

      if (!fromGate || !toGate) continue;

      const fromX = fromGate.x + 120;
      const fromY = fromGate.y + 50;
      const toInputCount = toGate.inputs;
      const toX = toGate.x;
      const toY = toGate.y + (toInputCount === 1 ? 50 : (wire.toIndex === 0 ? 35 : 65));

      if (isPointNearBezier(x, y, fromX, fromY, toX, toY)) {
        deleteWire(wire);
        break;
      }
    }
  };

  const isPointNearBezier = (px, py, x1, y1, x2, y2) => {
    const threshold = 10;
    const steps = 100;

    const dx = x2 - x1;
    const controlDistance = Math.min(Math.abs(dx) / 2, Math.sqrt(dx * dx + (y2 - y1) * (y2 - y1)) / 3);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;

      const cx1 = x1 + controlDistance;
      const cy1 = y1;
      const cx2 = x2 - controlDistance;
      const cy2 = y2;

      const x = mt3 * x1 + 3 * mt2 * t * cx1 + 3 * mt * t2 * cx2 + t3 * x2;
      const y = mt3 * y1 + 3 * mt2 * t * cy1 + 3 * mt * t2 * cy2 + t3 * y2;

      const dist = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
      if (dist < threshold) return true;
    }
    return false;
  };

  const toggleInput = (gate) => {
    setGates(prev => prev.map(g =>
      g.id === gate.id
        ? { ...g, inputValues: [!g.inputValues[0]] }
        : g
    ));
  };

  const generateTruthTable = () => {
    const inputs = gates.filter(g => g.type === 'INPUT');
    const outputs = gates.filter(g => g.type === 'OUTPUT');

    if (inputs.length === 0 || outputs.length === 0) {
      return { headers: [], rows: [] };
    }

    const numCombinations = Math.pow(2, inputs.length);
    const rows = [];

    for (let i = 0; i < numCombinations; i++) {
      const inputValues = inputs.map((_, index) => {
        return (i >> (inputs.length - 1 - index)) & 1 ? true : false;
      });

      const tempGates = gates.map(g => {
        if (g.type === 'INPUT') {
          const index = inputs.findIndex(inp => inp.id === g.id);
          return { ...g, inputValues: [inputValues[index]] };
        }
        return g;
      });

      const outputValues = outputs.map(outGate => {
        const gate = tempGates.find(g => g.id === outGate.id);
        return evaluateGateWithGates(gate, tempGates) ? 1 : 0;
      });

      rows.push([...inputValues.map(v => v ? 1 : 0), ...outputValues]);
    }

    const headers = [
      ...inputs.map(g => g.label),
      ...outputs.map(g => g.label)
    ];

    return { headers, rows };
  };

  const evaluateGateWithGates = (gate, gatesList) => {
    if (!gate) return false;

    if (gate.type === 'INPUT') {
      return gate.inputValues[0] || false;
    }

    const inputs = [];
    wires.forEach(wire => {
      if (wire.toId === gate.id) {
        const fromGate = gatesList.find(g => g.id === wire.fromId);
        if (fromGate) {
          const sourceOutput = evaluateGateWithGates(fromGate, gatesList);
          inputs[wire.toIndex] = sourceOutput;
        }
      }
    });

    switch (gate.type) {
      case 'AND':
        return inputs.length === 2 && inputs[0] && inputs[1];
      case 'OR':
        return inputs.length === 2 && (inputs[0] || inputs[1]);
      case 'NOT':
        return !inputs[0];
      case 'NAND':
        return !(inputs.length === 2 && inputs[0] && inputs[1]);
      case 'NOR':
        return !(inputs.length === 2 && (inputs[0] || inputs[1]));
      case 'XOR':
        return inputs.length === 2 && (inputs[0] !== inputs[1]);
      case 'XNOR':
        return inputs.length === 2 && (inputs[0] === inputs[1]);
      case 'BUFFER':
        return inputs[0] || false;
      case 'OUTPUT':
        return inputs[0] || false;
      default:
        return false;
    }
  };

  const saveCircuit = () => {
    const data = {
      gates: gates,
      wires: wires,
      gateIdCounter,
      wireIdCounter
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuit.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadCircuit = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setGates(data.gates || []);
        setWires(data.wires || []);
        setGateIdCounter(data.gateIdCounter || 0);
        setWireIdCounter(data.wireIdCounter || 0);
        saveToHistory();
      } catch (error) {
        alert('Error loading circuit file');
      }
    };
    reader.readAsText(file);
  };

  const clearCircuit = () => {
    if (confirm('Clear all gates and wires?')) {
      setGates([]);
      setWires([]);
      setGateIdCounter(0);
      setWireIdCounter(0);
      setHistory([]);
      setHistoryIndex(-1);
    }
  };

  const truthTable = generateTruthTable();
  const inputGates = gates.filter(g => g.type === 'INPUT');
  const outputGates = gates.filter(g => g.type === 'OUTPUT');

  return (
    <div className="container"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
    >
      <div className="sidebar">
        <h2>Logic Gates</h2>
        <div className="gate-palette">
          <button className="gate-btn" onClick={() => addGate('INPUT')}>INPUT</button>
          <button className="gate-btn" onClick={() => addGate('OUTPUT')}>OUTPUT</button>
          <button className="gate-btn" onClick={() => addGate('AND')}>AND</button>
          <button className="gate-btn" onClick={() => addGate('OR')}>OR</button>
          <button className="gate-btn" onClick={() => addGate('NOT')}>NOT</button>
          <button className="gate-btn" onClick={() => addGate('NAND')}>NAND</button>
          <button className="gate-btn" onClick={() => addGate('NOR')}>NOR</button>
          <button className="gate-btn" onClick={() => addGate('XOR')}>XOR</button>
          <button className="gate-btn" onClick={() => addGate('XNOR')}>XNOR</button>
          <button className="gate-btn" onClick={() => addGate('BUFFER')}>BUFFER</button>
        </div>

        <div className="instructions">
          <p><strong>Controls:</strong></p>
          <p>• Click gate buttons to add gates</p>
          <p>• Drag gates to move them</p>
          <p>• Click output → input to connect</p>
          <p>• Click wire to delete it</p>
          <p>• Right-click gate to delete</p>
          <p><strong>Keyboard Shortcuts:</strong></p>
          <p>• Ctrl+Z: Undo</p>
          <p>• Ctrl+Shift+Z: Redo</p>
          <p>• Delete: Remove selected gate</p>
          <p>• Escape: Cancel connection</p>
        </div>
      </div>

      <div className="canvas-container" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{ pointerEvents: 'auto' }}
        />

        {gates.map(gate => (
          <div
            key={gate.id}
            className={`gate ${gate.type === 'OUTPUT' ? 'output-gate' : ''} ${selectedGate?.id === gate.id ? 'selected' : ''} ${gate.type === 'OUTPUT' && evaluateGate(gate) ? 'active' : ''}`}
            style={{ left: gate.x, top: gate.y }}
            onMouseDown={(e) => startDrag(e, gate)}
            onContextMenu={(e) => { e.preventDefault(); deleteGate(gate); }}
          >
            <div className="gate-content">
              {gateSymbols[gate.type]}
              <div className="gate-label">{gate.label || gate.type}</div>
            </div>

            {gate.hasOutput && (
              <div
                className={`connection-point output-point ${connectingFrom?.id === gate.id ? 'active' : ''}`}
                onClick={() => startConnection(gate)}
              />
            )}

            {gate.inputs > 0 && (
              <>
                <div
                  className={`connection-point input-point ${connectingFrom ? 'active' : ''}`}
                  style={{ top: gate.inputs === 1 ? '50%' : '35%' }}
                  onClick={() => completeConnection(gate, 0)}
                />
                {gate.inputs === 2 && (
                  <div
                    className={`connection-point input-point ${connectingFrom ? 'active' : ''}`}
                    style={{ top: '65%' }}
                    onClick={() => completeConnection(gate, 1)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="truth-table-panel">
        <h2>Circuit Control</h2>

        {inputGates.length > 0 && (
          <div className="input-controls">
            <h3 style={{ fontSize: '12px', color: 'var(--accent-primary)', marginBottom: '10px' }}>Input Toggles</h3>
            {inputGates.map(gate => (
              <div key={gate.id} className="input-toggle">
                <label>{gate.label}</label>
                <div
                  className={`toggle-btn ${gate.inputValues[0] ? 'on' : ''}`}
                  onClick={() => toggleInput(gate)}
                />
              </div>
            ))}
          </div>
        )}

        {outputGates.length > 0 && (
          <div className="output-display">
            <h3>Output Values</h3>
            {outputGates.map(gate => (
              <div key={gate.id} className="output-item">
                <label>{gate.label}</label>
                <div className={`output-value ${evaluateGate(gate) ? 'high' : 'low'}`}>
                  {evaluateGate(gate) ? '1' : '0'}
                </div>
              </div>
            ))}
          </div>
        )}

        {truthTable.headers.length > 0 && (
          <>
            <h2 style={{ marginTop: '20px' }}>Truth Table</h2>
            <table>
              <thead>
                <tr>
                  {truthTable.headers.map((header, i) => (
                    <th key={i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {truthTable.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="controls">
          <button className="btn" onClick={undo} disabled={historyIndex <= 0}>
            ↶ Undo
          </button>
          <button className="btn" onClick={redo} disabled={historyIndex >= history.length - 1}>
            ↷ Redo
          </button>
          <button className="btn" onClick={saveCircuit}>💾 Save Circuit</button>
          <label className="btn" style={{ cursor: 'pointer', textAlign: 'center' }}>
            📂 Load Circuit
            <input
              type="file"
              accept=".json"
              onChange={loadCircuit}
              style={{ display: 'none' }}
            />
          </label>
          <button className="btn danger" onClick={clearCircuit}>🗑️ Clear All</button>
        </div>

        <div className="stats">
          <div><span>Gates:</span> <strong>{gates.length}</strong></div>
          <div><span>Wires:</span> <strong>{wires.length}</strong></div>
          <div><span>Inputs:</span> <strong>{inputGates.length}</strong></div>
          <div><span>Outputs:</span> <strong>{outputGates.length}</strong></div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --bg-dark: #0a0e1a;
          --bg-medium: #141b2d;
          --bg-light: #1e2842;
          --accent-primary: #00ff88;
          --accent-secondary: #00d4ff;
          --accent-danger: #ff3366;
          --text-primary: #e8f0ff;
          --text-secondary: #8b9dc3;
          --grid-color: rgba(220, 220, 220, 0.08);
          --wire-on: #00ff88;
          --wire-off: #334155;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Azeret Mono', monospace;
          background: var(--bg-dark);
          color: var(--text-primary);
          overflow: hidden;
          height: 100vh;
        }

        .container {
          display: grid;
          grid-template-columns: 250px 1fr 320px;
          height: 100vh;
          gap: 0;
        }

        .sidebar {
          background: var(--bg-medium);
          border-right: 2px solid var(--bg-light);
          padding: 24px;
          overflow-y: auto;
        }

        .sidebar h2 {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sidebar h2::before {
          content: '▸';
          color: var(--accent-secondary);
        }

        .gate-palette {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gate-btn {
          background: var(--bg-light);
          border: 2px solid var(--bg-light);
          color: var(--text-primary);
          padding: 12px 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .gate-btn::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: var(--accent-primary);
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .gate-btn:hover {
          background: rgba(0, 255, 136, 0.1);
          border-color: var(--accent-primary);
          transform: translateX(4px);
        }

        .gate-btn:hover::before {
          transform: scaleY(1);
        }

        .gate-btn:active {
          transform: translateX(2px) scale(0.98);
        }

        .canvas-container {
          position: relative;
          background: var(--bg-dark);
          background-image:
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 20px 20px;
          overflow: hidden;
        }

        canvas {
          position: absolute;
          top: 0;
          left: 0;
          cursor: crosshair;
        }

        .gate {
          position: absolute;
          background: var(--bg-light);
          border: 2px solid var(--accent-primary);
          padding: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          cursor: move;
          user-select: none;
          box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 120px;
          text-align: center;
          border-radius: 4px;
          will-change: transform;
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gate:hover {
          border-color: var(--accent-secondary);
          box-shadow: 0 6px 30px rgba(0, 212, 255, 0.4);
          z-index: 10;
          transform: translateY(-2px);
        }

        .gate.selected {
          border-color: var(--accent-secondary);
          box-shadow: 0 8px 40px rgba(0, 212, 255, 0.6);
          cursor: grabbing;
          z-index: 1000;
          transition: none;
        }

        .gate-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .gate-symbol {
          width: 80px;
          height: 60px;
          color: var(--accent-primary);
          margin-bottom: 4px;
          filter: drop-shadow(0 0 4px rgba(0, 255, 136, 0.3));
        }

        .gate:hover .gate-symbol {
          color: var(--accent-secondary);
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
        }

        .gate-label {
          color: var(--accent-primary);
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 11px;
        }

        .connection-point {
          width: 14px;
          height: 14px;
          background: var(--bg-dark);
          border: 2.5px solid var(--accent-primary);
          border-radius: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 5;
        }

        .connection-point:hover {
          background: var(--accent-primary);
          box-shadow: 0 0 12px var(--accent-primary);
          transform: translate(-50%, -50%) scale(1.4);
          border-width: 3px;
        }

        .connection-point.active {
          background: var(--accent-primary);
          box-shadow: 0 0 20px var(--accent-primary);
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .input-point {
          left: 0;
          top: 50%;
        }

        .output-point {
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
        }

        .output-point:hover {
          transform: translate(50%, -50%) scale(1.4);
        }

        .truth-table-panel {
          background: var(--bg-medium);
          border-left: 2px solid var(--bg-light);
          padding: 24px;
          overflow-y: auto;
        }

        .truth-table-panel h2 {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent-secondary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .truth-table-panel h2::before {
          content: '◆';
          color: var(--accent-primary);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          margin-top: 16px;
        }

        th {
          background: var(--bg-light);
          color: var(--accent-primary);
          padding: 12px 8px;
          text-align: center;
          font-weight: 600;
          border: 1px solid rgba(0, 255, 136, 0.2);
          letter-spacing: 1px;
        }

        td {
          background: rgba(30, 40, 66, 0.5);
          color: var(--text-primary);
          padding: 10px 8px;
          text-align: center;
          border: 1px solid rgba(0, 255, 136, 0.1);
          transition: all 0.2s;
        }

        td:hover {
          background: rgba(0, 255, 136, 0.1);
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          background: var(--bg-light);
          border: 2px solid var(--accent-primary);
          color: var(--accent-primary);
          padding: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 2px;
        }

        .btn:hover:not(:disabled) {
          background: var(--accent-primary);
          color: var(--bg-dark);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
          transform: translateY(-2px);
        }

        .btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn.danger {
          border-color: var(--accent-danger);
          color: var(--accent-danger);
        }

        .btn.danger:hover {
          background: var(--accent-danger);
          color: white;
          box-shadow: 0 0 20px rgba(255, 51, 102, 0.5);
        }

        .instructions {
          margin-top: 24px;
          padding: 16px;
          background: rgba(0, 255, 136, 0.05);
          border-left: 3px solid var(--accent-primary);
          font-size: 11px;
          line-height: 1.6;
          color: var(--text-secondary);
          border-radius: 0 2px 2px 0;
        }

        .instructions p {
          margin-bottom: 8px;
        }

        .instructions strong {
          color: var(--accent-primary);
        }

        .input-controls {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .output-display {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 4px;
        }

        .output-display h3 {
          font-size: 12px;
          color: var(--accent-secondary);
          margin-bottom: 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .output-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-light);
          padding: 10px 12px;
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 2px;
          transition: all 0.2s;
        }

        .output-item:hover {
          background: rgba(30, 40, 66, 0.8);
        }

        .output-item label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .output-value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          padding: 4px 12px;
          border: 2px solid;
          min-width: 40px;
          text-align: center;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .output-value.high {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(0, 255, 136, 0.15);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
          animation: glow 2s ease-in-out infinite;
        }

        .output-value.low {
          color: var(--text-secondary);
          border-color: var(--wire-off);
          background: rgba(51, 65, 85, 0.1);
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
          }
        }

        .gate.output-gate {
          border-color: var(--accent-secondary);
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
        }

        .gate.output-gate .gate-label {
          color: var(--accent-secondary);
        }

        .gate.output-gate .gate-symbol {
          color: var(--accent-secondary);
        }

        .gate.output-gate.active {
          background: rgba(0, 255, 136, 0.1);
          border-color: var(--accent-primary);
          box-shadow: 0 6px 30px rgba(0, 255, 136, 0.5);
        }

        .gate.output-gate.active .gate-label {
          color: var(--accent-primary);
        }

        .gate.output-gate.active .gate-symbol {
          color: var(--accent-primary);
        }

        .input-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-light);
          padding: 10px 12px;
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 2px;
          transition: all 0.2s;
        }

        .input-toggle:hover {
          background: rgba(30, 40, 66, 0.8);
        }

        .input-toggle label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .toggle-btn {
          width: 50px;
          height: 26px;
          background: var(--wire-off);
          border: 2px solid var(--wire-off);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .toggle-btn:hover {
          transform: scale(1.05);
        }

        .toggle-btn.on {
          background: var(--wire-on);
          border-color: var(--wire-on);
          box-shadow: 0 0 15px var(--wire-on);
        }

        .toggle-btn::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          left: 2px;
          top: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-btn.on::after {
          left: 26px;
        }

        .stats {
          margin-top: 20px;
          padding: 12px;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 4px;
          font-size: 11px;
          color: var(--text-secondary);
        }

        .stats div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .stats div:last-child {
          margin-bottom: 0;
        }

        .stats strong {
          color: var(--accent-secondary);
          font-weight: 700;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-dark);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent-primary);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent-secondary);
        }
      `}</style>
    </div>
  );
};

export default Boolforge;
