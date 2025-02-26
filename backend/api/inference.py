"""
inference.py
-------------------

This script contains the code to run the YOLO models on the input image and return the detected caries boxes.

"""
import torch
import cv2
import numpy as np

# Load YOLO models
caries_model = torch.hub.load('ultralytics/yolov5', 'custom', path='../models/yolov5_caries.pt')
teeth_model = torch.hub.load('ultralytics/yolov5', 'custom', path='../models/yolov5_teeth.pt')

def run_model(image):
    teeth_results = teeth_model(image)
    caries_results = caries_model(image)

    teeth_boxes = teeth_results.pandas().xyxy[0].to_dict(orient="records")
    caries_boxes = caries_results.pandas().xyxy[0].to_dict(orient="records")

    # Match disease detections to specific teeth using IoU
    for caries in caries_boxes:
        for tooth in teeth_boxes:
            if iou([tooth['xmin'], tooth['ymin'], tooth['xmax'], tooth['ymax']], 
                   [caries['xmin'], caries['ymin'], caries['xmax'], caries['ymax']]) > 0.5:
                caries['tooth_number'] = tooth['name']

    return caries_boxes  # Return merged results

def iou(box1, box2):
    x1, y1, x2, y2 = box1
    x3, y3, x4, y4 = box2
    inter_area = max(0, min(x2, x4) - max(x1, x3)) * max(0, min(y2, y4) - max(y1, y3))
    return inter_area / ((x2-x1)*(y2-y1) + (x4-x3)*(y4-y3) - inter_area)
