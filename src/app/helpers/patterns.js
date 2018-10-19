let patterns = {
    challangePatterns1: [
        ["red", 0, 0, 0],
        [0, "blue", 0, 0],
        [0, 0, "green", 0],
        [0, 0, 0, "black"]
    ],
    normalPatterns: [
        [
            ["red", 0, 0, 0],
            [0, 0, 0, "black"],
            [0, "green", "blue", 0],
            [0, "red", "blue", 0],
            [0, "black", "green", 0],
            [0, 0, "green", 0],
            [0, "blue", "green", 0],
            ["blue", 0, 0, 0]
        ],
        [
            ["red", 0, 0, "black"],
            [0, 0, "green", 0],
            [0, "green", 0, 0],
            [0, 0, "blue", 0],
            [0, "blue", 0, 0],
            [0, "green", "blue", 0],
            [0, 0, 0, "red", ],
            ["black", 0, 0, 0],
            ["black", 0, 0, "red"],
            [0, 0, 0, "black"]
        ],
        [
            ["red", "blue", 0, 0],
            [0, 0, "green", "black"],
            ["blue", "red", 0, 0],
            [0, 0, "black", "green"],
            ["green", "black", 0, 0],
            ["green", 0, "black", 0],
            [0, "blue", 0, "black"],
            ["red", 0, 0, 0],
            [0, 0, 0, "black"],
            [0, 0, "green", 0]
        ],
        [
            ["red", 0, "green", 0],
            [0, "blue", 0, "black"],
            ["red", "blue", 0, 0],
            [0, 0, "green", "black"],
            ["blue", "red", 0, 0],
            ["green", 0, 0, 0],
            [0, 0, 0, "blue"],
            [0, "blue", 0, 0],
            [0, 0, "green", 0]
        ]
    ],
    rotatePatterns: [
        [
            [0, 0, "red", 0],
            ["green", 0, 0, "blue"],
            ["black", 0, 0, 0],
            [0, "blue", 0, 0],
            ["blue", "black", 0, 0],
            ["green", "blue", 0, 0],
            ["black", "red", 0, 0]
        ],
        [
            ["green", "green", "green", "black"],
            ["red", "blue", 0, 0],
            ["red", 0, 0, 0],
            ["black", 0, 0, 0],
            ["blue", "black", 0, 0],
            ["black", "blue", 0, 0],
            [0, 0, "black", "blue"]
            [0, "green", "red", 0],
            ["green", 0, 0, "black"],
        ],
        [
            [0, "blue", "green", 0],
            [0, "black", "red", 0],
            [0, "red", "green", 0],
            [0, "green", "red", 0],
            ["red", 0, "green", 0],
            ["green", 0, "red", 0],
            [0, 0, "green", "black"],
            ["red", 0, 0, 0],
            [0, "green", 0, 0],
            [0, 0, 0, "black"]
        ],
        [
            [0, 0, "blue", "red"],
            [0, 0, 0, "black"],
            [0, 0, 0, "green"],
            ["green", 0, 0, "black"],
            ["red", 0, 0, "green"],
            ["red", 0, "green", 0],
            [0, 0, "red", "blue"],
            [0, 0, "blue", "black"]
        ]
    ]
}

export default patterns;