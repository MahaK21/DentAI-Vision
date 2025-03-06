"""
inference.py
-------------------

This script contains the code to run the YOLO models on the input image and return the detected caries boxes.

"""
import torch
import cv2
import numpy as np
from pathlib import Path

# Path to the trained model
MODEL_PATH = Path("model/dentai_yolov5s/weights/best.pt")

# Load the YOLOv5 model
model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH, force_reload=True)

model.conf = 0.25  # Confidence threshold
model.iou = 0.45   # IOU threshold

def run_model(image_input):
    """
    Runs YOLOv5 on the input image and returns the labeled image.

    Args:
        image_input (str or np.array): File path or NumPy array of the image.

    Returns:
        np.array: Image with bounding boxes drawn.
    """
    # If input is a file path, read the image
    if isinstance(image_input, str):
        image = cv2.imread(image_input)
        if image is None:
            raise ValueError(f"Error loading image from {image_input}. Check the path.")
    else:
        image = image_input  # If input is already an image array, use it directly

    # Run inference
    results = model(image)

    # Check if detections exist
    if results.xyxy[0].shape[0] == 0:
        print("No caries detected in the image.")
        return image  # Return original image if nothing is detected

    # Process results
    for *xyxy, conf, cls in results.xyxy[0]:  # Iterate over detections
        label = f"Caries {conf:.2f}"  # Create label with confidence
        x1, y1, x2, y2 = map(int, xyxy)  # Convert to integer coordinates

        # Draw bounding box
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Put label above the box
        cv2.putText(image, label, (x1, max(y1 - 10, 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return image

