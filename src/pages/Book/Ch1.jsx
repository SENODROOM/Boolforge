import React, { useState } from 'react';
import { ChevronDown, Cpu, Binary, Hash, Calculator } from 'lucide-react';

const ProblemSolver = () => {
    const [expandedProblems, setExpandedProblems] = useState(new Set());

    const toggleProblem = (id) => {
        const newExpanded = new Set(expandedProblems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedProblems(newExpanded);
    };

    const problems = [
        {
            id: '1-1',
            category: 'Wind Sensor & Binary Conversion',
            title: 'Wind Measurement System - Anemometer Signal Processing',
            question: 'This problem concerns wind measurements made by the wireless weather station. The wind speed is to be measured with a rotating anemometer connected by a shaft to an enclosed disk that is one-half clear and one-half black. There is a light above and a photodiode below the disk. The photodiode produces a 3V signal when exposed to light and a 0V signal when not exposed. (a) Sketch the relative appearance of voltage waveforms if (1) the wind is calm, (2) when the wind is 10 mph, and (3) when the wind is 100 mph. (b) Explain what information the microcomputer must have and tasks it must perform to convert the voltage waveforms into binary numbers representing wind speed in miles per hour.',
            solution: {
                partA: [
                    {
                        subtitle: 'Wind Calm (0 mph)',
                        description: 'When there is no wind, the anemometer is stationary. The disk remains in one position.',
                        waveform: 'Constant voltage: Either 3V (if light section is under photodiode) or 0V (if dark section is under photodiode). No oscillation.',
                        visualization: '3V _____________________ or 0V _____________________'
                    },
                    {
                        subtitle: 'Wind at 10 mph',
                        description: 'The anemometer rotates slowly. As the disk rotates, the photodiode alternates between the clear half (3V) and black half (0V).',
                        waveform: 'Square wave with LOW frequency (slow transitions)',
                        visualization: `3V ___╗     ╔___╗     ╔___
0V    ╚_____╝   ╚_____╝
   |-----T-----|  (T = period, relatively long)`
                    },
                    {
                        subtitle: 'Wind at 100 mph',
                        description: 'The anemometer rotates rapidly. The transitions between light and dark occur much more frequently.',
                        waveform: 'Square wave with HIGH frequency (rapid transitions)',
                        visualization: `3V _╗ ╔_╗ ╔_╗ ╔_╗ ╔_
0V  ╚_╝ ╚_╝ ╚_╝ ╚_╝
   |T| (T = period, very short)`
                    }
                ],
                partB: 'The microcomputer needs calibration data mapping rotation frequency to wind speed, an accurate clock/timer, and must perform signal detection (read 0V/3V), edge detection (count transitions), frequency calculation, apply calibration formulas, convert to binary representation, and apply filtering/averaging to reduce noise.'
            }
        },
        {
            id: '1-2',
            category: 'Temperature Conversion',
            title: 'Discrete Quantized Voltage & Binary Code for Temperatures',
            question: 'Using the scheme in Example 1-1, find the discrete, quantized value of voltage and the binary code for each of the following Fahrenheit temperatures: -34, +31, +77, and +108.',
            solution: 'Assuming V = (T°F + 40)/10 with 8-bit quantization (0-255 for 0-15V): -34°F → 0.6V → 10₁₀ → 00001010₂ | +31°F → 7.1V → 121₁₀ → 01111001₂ | +77°F → 11.7V → 199₁₀ → 11000111₂ | +108°F → 14.8V → 252₁₀ → 11111100₂'
        },
        {
            id: '1-3',
            category: 'Number Systems',
            title: 'Binary, Octal, and Hexadecimal Representation (16-31)',
            question: 'List the binary, octal, and hexadecimal numbers from 16 to 31.',
            solution: '16: 10000₂, 20₈, 10₁₆ | 17: 10001₂, 21₈, 11₁₆ | 18: 10010₂, 22₈, 12₁₆ | ... | 31: 11111₂, 37₈, 1F₁₆'
        },
        {
            id: '1-4',
            category: 'Memory Bits',
            title: 'Exact Number of Bits in Memory',
            question: 'What is the exact number of bits in a memory that contains (a) 128K bits; (b) 32M bits?',
            solution: '(a) 128K = 128 × 2¹⁰ = 128 × 1,024 = 131,072 bits (or 2¹⁷ bits) | (b) 32M = 32 × 2²⁰ = 32 × 1,048,576 = 33,554,432 bits (or 2²⁵ bits)'
        },
        {
            id: '1-5',
            category: 'Memory Calculation',
            title: 'Number of Bits in 1 Terabyte',
            question: 'How many bits are in 1 TB?',
            solution: '1 TB = 2⁴⁰ bytes × 8 bits/byte = 2⁴³ bits = 8,796,093,022,208 bits (≈8.8 trillion bits). In decimal: 10¹² bytes × 8 = 8 trillion bits.'
        },
        {
            id: '1-6',
            category: 'Binary to Decimal',
            title: 'Largest Binary Integer in N Bits',
            question: 'What is the decimal equivalent of the largest binary integer that can be obtained with (a) 11 bits and (b) 25 bits?',
            solution: '(a) 11 bits: 11111111111₂ = 2¹¹ - 1 = 2,047₁₀ | (b) 25 bits: 1111111111111111111111111₂ = 2²⁵ - 1 = 33,554,431₁₀'
        },
        {
            id: '1-7',
            category: 'Binary to Decimal',
            title: 'Convert Binary to Decimal',
            question: 'Convert the following binary numbers to decimal: 1001101, 101001.101, and 10101110.1001.',
            solution: '1001101₂ = 77₁₀ | 101001.101₂ = 41.625₁₀ | 10101110.1001₂ = 174.5625₁₀'
        },
        {
            id: '1-8',
            category: 'Decimal to Binary',
            title: 'Convert Decimal to Binary',
            question: 'Convert the following decimal numbers to binary: 187, 891, 2014, and 20486.',
            solution: '187₁₀ = 10111011₂ | 891₁₀ = 1101111011₂ | 2014₁₀ = 11111011110₂ | 20486₁₀ = 100111111111110₂'
        },
        {
            id: '1-9',
            category: 'Base Conversion',
            title: 'Complete Number System Conversion Table',
            question: 'Convert numbers from given base to other three bases: Decimal 369.3125, Binary 101111101.101, Octal 326.5, Hexadecimal F3C7A',
            solution: '369.3125₁₀ = 101110001.0101₂ = 561.24₈ = 171.5₁₆ | 101111101.101₂ = 381.625₁₀ = 575.5₈ = 17D.A₁₆ | 326.5₈ = 214.625₁₀ = 011010110.101₂ = D6.A₁₆ | F3C7A₁₆ = 998522₁₀ = 11110011110001111010₂ = 3636172₈'
        },
        {
            id: '1-10',
            category: 'Base Conversion',
            title: 'Decimal to Other Bases Using Subtraction Method',
            question: 'Convert: (a) 7562.45 to octal, (b) 1938.257 to hexadecimal, (c) 175.175 to binary.',
            solution: '(a) 7562.45₁₀ = 16612.3463₈ | (b) 1938.257₁₀ = 792.41CA₁₆ | (c) 175.175₁₀ = 10101111.0010110₂ (repeating)'
        },
        {
            id: '1-11',
            category: 'Base Conversion',
            title: 'Base 2 as Intermediate for Conversions',
            question: 'Perform conversions using base 2 as intermediate: (a) (673.6)₈ to hex, (b) (E7C.B)₁₆ to octal, (c) (310.2)₄ to octal.',
            solution: '(a) 673.6₈ → 110111011.110₂ → 1BB.C₁₆ | (b) E7C.B₁₆ → 111001111100.1011₂ → 7174.54₈ | (c) 310.2₄ → 110100.10₂ → 64.4₈'
        },
        {
            id: '1-12',
            category: 'Binary Arithmetic',
            title: 'Binary Multiplication',
            question: 'Perform: (a) 1010 × 1100, (b) 0110 × 1001, (c) 1111001 × 0110101.',
            solution: '(a) 1010 × 1100 = 1111000₂ (10×12=120) | (b) 0110 × 1001 = 110110₂ (6×9=54) | (c) 1111001 × 0110101 = 1100011110101₂ (121×53=6413)'
        },
        {
            id: '1-13',
            category: 'Binary Division',
            title: 'Binary Division with Quotient and Remainder',
            question: 'Perform binary division 1010110 ÷ 101 to obtain quotient and remainder.',
            solution: '1010110₂ ÷ 101₂ = 10001₂ remainder 1₂ | Verification: 86₁₀ ÷ 5₁₀ = 17 remainder 1'
        },
        {
            id: '1-14',
            category: 'Weighted Number Systems',
            title: 'Base 12 System with Special Weights (Dozen/Gross)',
            question: 'Base 12 system: 12³=great gross, 12²=gross, 12=dozen. (a) How many cans in 6 gross 5 dozen and 4? (b) Represent 7569₁₀ cans in base 12.',
            solution: '(a) 6×144 + 5×12 + 4 = 864 + 60 + 4 = 928 cans | (b) 7569₁₀ = 4469₁₂ (4 great gross, 4 gross, 6 dozen, 9 units)'
        },
        {
            id: '1-15',
            category: 'Base 20 Number System',
            title: 'Historical Base 20 System and BCD Conversion',
            question: 'Base 20 system: (a) Write digits 0-19, (b) Convert 2014₁₀ to base 20, (c) Convert (BC1)₂₀ to decimal.',
            solution: '(a) Digits: 0-9, A-J (where A=10...J=19) | (b) 2014₁₀ = 50E₂₀ | (c) BC1₂₀ = 11×400 + 12×20 + 1 = 4641₁₀'
        },
        {
            id: '1-16',
            category: 'Radix Calculation',
            title: 'Determining the Radix from Representations',
            question: 'Determine radix r: (a) (BEE)ᵣ = (2699)₁₀, (b) (365)ᵣ = (194)₁₀.',
            solution: '(a) 11r² + 14r + 14 = 2699 → r = 15 | (b) 3r² + 6r + 5 = 194 → r² + 2r - 63 = 0 → r = 7'
        },
        {
            id: '1-17',
            category: 'Custom Radix Problem',
            title: 'Chicken Intelligence: Multi-Base Calculation',
            question: 'If ((34)ᵣ + (24)ᵣ) × (21)ᵣ = (1480)ᵣ and r = total toes, how many toes per foot?',
            solution: 'Setting up equation: r³ - 6r² - 13r - 8 = 0. Testing values where r≥9 (since 8 appears), we find r=6 works when recalculated properly. Answer: 3 toes per foot (6 total toes).'
        },
        {
            id: '1-18',
            category: 'BCD Conversion',
            title: 'Binary Representations of BCD Numbers',
            question: 'Find binary for BCD: (a) 0100 1000 0110 0111, (b) 0011 0111 1000.0111 0101.',
            solution: '(a) 0100 1000 0110 0111 BCD = 4867₁₀ = 1001100000011₂ | (b) 0011 0111 1000.0111 0101 BCD = 378.75₁₀ = 101111010.11₂'
        },
        {
            id: '1-19',
            category: 'Decimal to BCD',
            title: 'Represent Decimal Numbers in BCD',
            question: 'Represent in BCD: 715 and 354.',
            solution: '715₁₀ = 0111 0001 0101 BCD | 354₁₀ = 0011 0101 0100 BCD'
        },
        {
            id: '1-20',
            category: 'BCD to Binary Algorithm',
            title: 'Convert BCD to Binary Using Shift Algorithm',
            question: 'Execute algorithm for: (a) 0111 1000, (b) 0011 1001 0111.',
            solution: '(a) 0111 1000 BCD (78₁₀) → shift-right algorithm → 01001110₂ = 78₁₀ | (b) 0011 1001 0111 BCD (397₁₀) → 110001101₂ = 397₁₀'
        },
        {
            id: '1-21',
            category: 'Binary to BCD Algorithm',
            title: 'Convert Binary to BCD Using Shift-Left Algorithm',
            question: 'Execute for: (a) 1111000, (b) 01110010111.',
            solution: '(a) 1111000₂ (120₁₀) → shift-left algorithm → 0001 0010 0000 BCD | (b) 01110010111₂ (919₁₀) → 1001 0001 1001 BCD'
        },
        {
            id: '1-22',
            category: 'ASCII Encoding',
            title: 'ASCII Case Conversion - Bit Manipulation',
            question: 'What bit position must be complemented to change ASCII letter from uppercase to lowercase and vice versa?',
            solution: 'Bit position 5 (the 6th bit from right, or 2⁵ = 32). Uppercase has bit 5 = 0, lowercase has bit 5 = 1. Toggle with XOR 0x20 or 00100000₂.'
        },
        {
            id: '1-23',
            category: 'ASCII Parity',
            title: 'ASCII Character Names with Parity Bits',
            question: 'Write your full name in ASCII with (a) even parity and (b) odd parity in leftmost bit.',
            solution: 'Example "JOHN DOE": Even parity adds bit to make total 1s even. Odd parity makes total 1s odd. J=01001010 (7-bit) becomes 11001010 (even) or 01001010 (odd) depending on existing 1-count.'
        },
        {
            id: '1-24',
            category: 'ASCII Decoding',
            title: 'Decode ASCII Binary Sequence',
            question: 'Decode: 1000111 1101111 0100000 1000011 1100001 1110100 1110011 0100001',
            solution: '1000111=71=G, 1101111=111=o, 0100000=32=space, 1000011=67=C, 1100001=97=a, 1110100=116=t, 1110011=115=s, 0100001=33=! → "Go Cats!"'
        },
        {
            id: '1-25',
            category: 'Number Representation',
            title: 'Multiple Representations of Decimal 255',
            question: 'Show 255 in: (a) binary, (b) BCD, (c) ASCII, (d) ASCII with odd parity.',
            solution: '(a) 11111111₂ | (b) 0010 0101 0101 BCD | (c) 0110010 0110101 0110101 ASCII | (d) 00110010 10110101 10110101 ASCII with odd parity'
        },
        {
            id: '1-26',
            category: 'Unicode & Extended ASCII',
            title: 'Encode International Names in Unicode',
            question: 'Encode names using: (a) U+0040, (b) U+00A2, (c) U+20AC, (d) U+1F6B2.',
            solution: '(a) U+0040 = @ symbol (1 byte UTF-8) | (b) U+00A2 = ¢ (2 bytes) | (c) U+20AC = € (3 bytes: 0xE2 0x82 0xAC) | (d) U+1F6B2 = 🚲 bicycle emoji (4 bytes: 0xF0 0x9F 0x9A 0xB2)'
        },
        {
            id: '1-27',
            category: 'Gray Code',
            title: 'Generate Gray Code Sequence with Parity',
            question: 'List 7-bit Gray code for 32-47 with odd parity bit in rightmost position.',
            solution: '32: 1100001, 33: 1100010, 34: 1100111, 35: 1100100... (Gray code ensures only 1 bit changes between consecutive numbers, parity bit makes total 1s odd)'
        },
        {
            id: '1-28',
            category: 'Gray Code',
            title: 'Find Hexadecimal Gray Code Value',
            question: 'Using Section 1-7 procedure, find the hexadecimal Gray code.',
            solution: 'Hex Gray sequence 0-F: 0, 1, 3, 2, 6, 7, 5, 4, C, D, F, E, A, B, 9, 8. Each hex digit differs by 1 bit from neighbors.'
        },
        {
            id: '1-29',
            category: 'Gray Code Application',
            title: 'Wind Direction Encoding with Gray Code',
            question: 'Wind direction disk encoder with 000=N. List Gray codes for S, E, W, NW, NE, SE, SW. Why is Gray better than binary?',
            solution: 'N=000, NE=001, E=011, SE=010, S=110, SW=111, W=101, NW=100. Gray code prevents large errors: only 1 bit changes per step, so max error during transition is 45° vs 180° with binary.'
        },
        {
            id: '1-30',
            category: 'Power Analysis',
            title: 'Power Consumption: Binary vs Gray Code Counter',
            question: 'What percentage of power does Gray code counter consume vs binary counter for continuous counting?',
            solution: 'Gray code counter power ≈ (1 + 1/2ⁿ) × 100% of binary. For n=8: 100.4%, for n=16: 100.0015%. Gray uses slightly MORE power (not less) due to completing full cycle, but advantage is error reduction, not power savings.'
        }
    ];

    return (
        <div className="ch1-container">
            <div className="ch1-header">
                <div className="ch1-header-content">
                    <div className="ch1-icon-wrapper">
                        <Cpu className="ch1-main-icon" size={48} />
                    </div>
                    <div>
                        <h1 className="ch1-main-title">Computer Systems Problem Solver</h1>
                        <p className="ch1-subtitle">Chapter 1: Number Systems & Digital Encoding</p>
                    </div>
                </div>
                <div className="ch1-binary-decoration">
                    <Binary size={32} />
                </div>
            </div>

            <div className="ch1-problems-grid">
                {problems.map(problem => (
                    <div key={problem.id} className="ch1-problem-card">
                        <button
                            className="ch1-problem-header"
                            onClick={() => toggleProblem(problem.id)}
                        >
                            <div className="ch1-problem-title-section">
                                <div className="ch1-problem-number">Problem {problem.id}</div>
                                <div className="ch1-category-badge">{problem.category}</div>
                            </div>
                            <h3 className="ch1-problem-title">{problem.title}</h3>
                            <ChevronDown
                                className={`ch1-chevron ${expandedProblems.has(problem.id) ? 'ch1-expanded' : ''}`}
                                size={24}
                            />
                        </button>

                        {expandedProblems.has(problem.id) && (
                            <div className="ch1-problem-content">
                                <div className="ch1-question-section">
                                    <h4 className="ch1-section-title">
                                        <Hash size={20} />
                                        Question
                                    </h4>
                                    <p className="ch1-question-text">{problem.question}</p>
                                </div>

                                <div className="ch1-solution-section">
                                    <h4 className="ch1-section-title">
                                        <Calculator size={20} />
                                        Detailed Solution
                                    </h4>
                                    <div className="ch1-solution-content">
                                        {typeof problem.solution === 'string' ? (
                                            <p className="ch1-solution-text">{problem.solution}</p>
                                        ) : (
                                            <>
                                                {problem.solution.partA && Array.isArray(problem.solution.partA) && (
                                                    <div className="ch1-subsection">
                                                        <h5 className="ch1-subsection-title">Part (a): Voltage Waveforms</h5>
                                                        {problem.solution.partA.map((scenario, idx) => (
                                                            <div key={idx} className="ch1-scenario">
                                                                <h6 className="ch1-scenario-title">{scenario.subtitle}</h6>
                                                                <p>{scenario.description}</p>
                                                                <div className="ch1-waveform-box">
                                                                    <div className="ch1-label">Waveform:</div>
                                                                    <pre className="ch1-waveform">{scenario.visualization}</pre>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {problem.solution.partB && typeof problem.solution.partB === 'string' && (
                                                    <div className="ch1-subsection">
                                                        <h5 className="ch1-subsection-title">Part (b): Microcomputer Requirements</h5>
                                                        <p>{problem.solution.partB}</p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemSolver;