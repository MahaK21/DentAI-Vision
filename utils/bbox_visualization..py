'''
bbox_visualization.py
-------------------

This script contains the code to draw bounding boxes on an X-ray image based on YOLOv5 detections.

'''
import cv2
import numpy as np
import random

# Define colors for different labels
LABEL_COLORS = {
    "teeth": (255, 0, 0),   # Blue for teeth enumeration
    "caries": (0, 0, 255),  # Red for cavities
    "impacted": (0, 165, 255)  # Orange for impacted teeth
}

def draw_bounding_boxes(image_path, detections, output_path="output.jpg"):
    """
    Draws bounding boxes on an X-ray image based on YOLOv5 detections.
    
    :param image_path: Path to the original X-ray image.
    :param detections: List of detection results from YOLOv5 in the format:
                       [{'xmin': x1, 'ymin': y1, 'xmax': x2, 'ymax': y2, 'name': 'Tooth 18', 'confidence': 95.4}, ...]
    :param output_path: Path to save the annotated image.
    """
    # Load image
    image = cv2.imread(image_path)

    if image is None:
        raise FileNotFoundError(f"Could not load image at {image_path}")

    # Loop through detections and draw bounding boxes
    for det in detections:
        x1, y1, x2, y2 = int(det['xmin']), int(det['ymin']), int(det['xmax']), int(det['ymax'])
        label = det['name']
        confidence = det.get('confidence', 100)  # Default to 100 if confidence is missing

        # Determine color based on label
        color = LABEL_COLORS.get("teeth", (255, 255, 255))  # Default to white

        if "caries" in label.lower():
            color = LABEL_COLORS["caries"]
        elif "impacted" in label.lower():
            color = LABEL_COLORS["impacted"]

        # Adjust brightness based on confidence
        brightness_factor = int((confidence / 100) * 200)  # Scale between 0-255
        color = tuple(min(255, c + brightness_factor) for c in color)

        # Draw bounding box
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # Put label and confidence score
        text = f"{label} ({confidence:.1f}%)"
        text_size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
        text_x, text_y = x1, y1 - 10 if y1 - 10 > 10 else y1 + 20

        # Draw filled rectangle for text background
        cv2.rectangle(image, (text_x, text_y - text_size[1] - 5), (text_x + text_size[0] + 5, text_y + 5), color, -1)
        cv2.putText(image, text, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    # Save and display image
    cv2.imwrite(output_path, image)
    cv2.imshow("Annotated X-ray", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Example Usage
if __name__ == "__main__":
    test_detections = [
        {"xmin": 50, "ymin": 100, "xmax": 150, "ymax": 200, "name": "Tooth 18", "confidence": 97.3},
        {"xmin": 200, "ymin": 300, "xmax": 300, "ymax": 400, "name": "Caries", "confidence": 92.1},
        {"xmin": 400, "ymin": 500, "xmax": 500, "ymax": 600, "name": "Impacted", "confidence": 80.5}
    ]
    draw_bounding_boxes("sample_xray.jpg", test_detections, "output_xray.jpg")
