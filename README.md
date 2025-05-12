# DentAI-Vision

DentAI-Vision is a machine learning project focused on analyzing dental X-rays to assist dental professionals in diagnosing dental abnormalities, with a primary focus on caries detection. The project leverages state-of-the-art deep learning techniques to provide accurate and efficient diagnostics.

## Key Features
- Automated detection and classification of dental abnormalities (caries, impacted teeth)
- User-friendly web interface for uploading and analyzing X-rays
- Modular architecture for easy extension and maintenance

## Project Structure
```
DentAI-Vision/
├── backend/         # Backend API and services
├── frontend/        # React-based web frontend
├── model/           # Machine learning models and scripts
├── utils/           # Utility scripts
├── data/            # Data storage (not included in repo)
└── README.md        # Project documentation
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js (for frontend)
- pip (Python package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/DentAI-Vision.git
cd DentAI-Vision
```

### 2. Model Setup
Install dependencies:
```bash
cd model
pip install -r requirements.txt
```

#### Running the Model
To run inference on your dental X-ray images:
```bash
python detect.py --weights /path/to/your/weights/best.pt --source /path/to/your/images --save-txt --project /path/to/output --classes 0 --name experiment_name
```
- `--weights`: Path to trained model weights (e.g., `model/dentai_yolov5s/weights/best.pt`)
- `--source`: Directory containing input images
- `--save-txt`: Save detection results as text files
- `--project`: Output directory for results
- `--classes 0`: Only detect caries (class 0)
- `--name`: Name for the experiment/output folder

#### Example
```bash
python detect.py --weights model/dentai_yolov5s/weights/best.pt --source data/val/images --save-txt --project results --classes 0 --name caries_detection
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run start
```
The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Model Performance
| Class     | Images | Instances | Precision | Recall | mAP50 | mAP50-95 |
|-----------|--------|-----------|-----------|--------|-------|----------|
| all       | 141    | 578       | 0.779     | 0.814  | 0.819 | 0.547    |
| caries    | 141    | 107       | 0.920     | 0.983  | 0.973 | 0.649    |
| impacted  | 141    | 471       | 0.639     | 0.695  | 0.665 | 0.444    |

*Note: The model is currently configured to focus on caries detection.*

## Chatbot Integration

DentAI-Vision includes a chatbot feature powered by LangChain. The chatbot uses a custom DeepSeek API wrapper and retrieves relevant dental information from local documents to provide helpful responses. For more details, see the implementation in `backend/api/chatbot/deep_chatbot.py`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## Contact
For questions, suggestions, or support, please open an issue or contact the maintainer at [dentai.vision.group@gmai.com].

---
Stay tuned for more updates!
